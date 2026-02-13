import fs from "node:fs";
import path from "node:path";

const SKILLS = [
  "vercel/skills/react-best-practices",
  "vercel/skills/web-design-guidelines",
  "vercel/skills/vercel-deploy",
  "expo/skills/expo-app-design",
  "expo/skills/expo-deployment",
  "expo/skills/upgrading-expo",
  "anthropics/skills/frontend-design",
  "anthropics/skills/pdf",
  "anthropics/skills/xlsx",
  "anthropics/skills/docx",
  "anthropics/skills/pptx",
  "anthropics/skills/mcp-builder",
  "anthropics/skills/skill-creator",
  "anthropics/skills/doc-coauthoring",
  "anthropics/skills/canvas-design",
  "anthropics/skills/algorithmic-art",
  "anthropics/skills/webapp-testing",
  "anthropics/skills/brand-guidelines",
  "anthropics/skills/internal-comms",
  "anthropics/claude-code/code-review",
  "wshobson/agents/python-development",
  "wshobson/agents/javascript-typescript",
  "wshobson/agents/backend-development",
  "wshobson/agents/database-design",
  "wshobson/agents/code-refactoring",
  "wshobson/agents/llm-application-dev",
  "wshobson/agents/code-documentation",
  "skillcreatorai/Ai-Agent-Skills/jira-issues",
  "skillcreatorai/Ai-Agent-Skills/qa-regression",
  "skillcreatorai/Ai-Agent-Skills/job-application",
  "skillcreatorai/Ai-Agent-Skills/ask-questions-if-underspecified",
  "skillcreatorai/Ai-Agent-Skills/best-practices",
  "ComposioHQ/awesome-claude-skills/artifacts-builder",
  "ComposioHQ/awesome-claude-skills/changelog-generator",
  "ComposioHQ/awesome-claude-skills/competitive-ads-extractor",
  "ComposioHQ/awesome-claude-skills/content-research-writer",
  "ComposioHQ/awesome-claude-skills/developer-growth-analysis",
  "ComposioHQ/awesome-claude-skills/domain-name-brainstormer",
  "ComposioHQ/awesome-claude-skills/file-organizer",
  "ComposioHQ/awesome-claude-skills/image-enhancer",
  "ComposioHQ/awesome-claude-skills/invoice-organizer",
  "ComposioHQ/awesome-claude-skills/lead-research-assistant",
  "ComposioHQ/awesome-claude-skills/meeting-insights-analyzer",
  "ComposioHQ/awesome-claude-skills/raffle-winner-picker",
  "ComposioHQ/awesome-claude-skills/slack-gif-creator",
  "ComposioHQ/awesome-claude-skills/theme-factory",
  "ComposioHQ/awesome-claude-skills/video-downloader",
];

function utcNowIso() {
  // Example: 2026-02-14T02:03:04.123Z
  return new Date().toISOString();
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function rmrf(p) {
  if (!fs.existsSync(p)) return;
  fs.rmSync(p, { recursive: true, force: true });
}

function readExists(p) {
  try {
    fs.accessSync(p, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

function findLocalSkillDir(skillName) {
  const userProfile = process.env.USERPROFILE;
  const candidates = [];

  if (userProfile) {
    candidates.push(path.join(userProfile, ".codex", "skills", skillName));
    candidates.push(path.join(userProfile, ".agents", "skills", skillName));
  }

  candidates.push(path.join(process.cwd(), ".agent", "skills", skillName));
  candidates.push(path.join(process.cwd(), ".skills", skillName));

  for (const c of candidates) {
    if (readExists(path.join(c, "SKILL.md"))) return c;
  }
  return null;
}

function writeText(p, text) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, text.replace(/\r?\n/g, "\n"), "utf8");
}

function writeJson(p, obj) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

function placeholderSkillMd(identifier, name) {
  return `---\nname: ${name}\ndescription: Placeholder skill installed from ${identifier} (content not available offline).\nsource: ${identifier}\nlicense: unknown\n---\n\n# ${name}\n\nThis skill was installed as a placeholder so it appears in the local \`.skills/\` list.\n\n## Next step\n\n- Replace this placeholder by importing the upstream \`${identifier}\` skill files (SKILL.md + any scripts/resources).\n`;
}

function cpDir(src, dst) {
  rmrf(dst);
  fs.cpSync(src, dst, { recursive: true });
}

function main() {
  const skillsRoot = path.join(process.cwd(), ".skills");
  ensureDir(skillsRoot);

  const now = utcNowIso();
  const installedReal = [];
  const installedPlaceholder = [];

  for (const identifier of SKILLS) {
    const name = identifier.split("/").filter(Boolean).slice(-1)[0];
    const destDir = path.join(skillsRoot, name);

    const localSrc = findLocalSkillDir(name);
    if (localSrc) {
      cpDir(localSrc, destDir);
      installedReal.push(`${name} <- ${localSrc}`);
    } else {
      rmrf(destDir);
      ensureDir(destDir);
      writeText(path.join(destDir, "SKILL.md"), placeholderSkillMd(identifier, name));
      installedPlaceholder.push(name);
    }

    writeJson(path.join(destDir, ".skill-meta.json"), {
      source: "manual",
      identifier,
      name,
      installedAt: now,
      updatedAt: now,
    });
  }

  process.stdout.write(
    JSON.stringify({ real: installedReal, placeholder: installedPlaceholder }, null, 2) + "\n"
  );
}

main();

