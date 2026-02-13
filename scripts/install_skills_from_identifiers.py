import json
import os
import shutil
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path


@dataclass(frozen=True)
class SkillSpec:
    identifier: str  # e.g. "vercel/skills/react-best-practices"

    @property
    def name(self) -> str:
        # Convention: last path segment is the skill folder name
        return self.identifier.strip("/").split("/")[-1].strip()


SKILLS: list[SkillSpec] = [
    SkillSpec("vercel/skills/react-best-practices"),
    SkillSpec("vercel/skills/web-design-guidelines"),
    SkillSpec("vercel/skills/vercel-deploy"),
    SkillSpec("expo/skills/expo-app-design"),
    SkillSpec("expo/skills/expo-deployment"),
    SkillSpec("expo/skills/upgrading-expo"),
    SkillSpec("anthropics/skills/frontend-design"),
    SkillSpec("anthropics/skills/pdf"),
    SkillSpec("anthropics/skills/xlsx"),
    SkillSpec("anthropics/skills/docx"),
    SkillSpec("anthropics/skills/pptx"),
    SkillSpec("anthropics/skills/mcp-builder"),
    SkillSpec("anthropics/skills/skill-creator"),
    SkillSpec("anthropics/skills/doc-coauthoring"),
    SkillSpec("anthropics/skills/canvas-design"),
    SkillSpec("anthropics/skills/algorithmic-art"),
    SkillSpec("anthropics/skills/webapp-testing"),
    SkillSpec("anthropics/skills/brand-guidelines"),
    SkillSpec("anthropics/skills/internal-comms"),
    SkillSpec("anthropics/claude-code/code-review"),
    SkillSpec("wshobson/agents/python-development"),
    SkillSpec("wshobson/agents/javascript-typescript"),
    SkillSpec("wshobson/agents/backend-development"),
    SkillSpec("wshobson/agents/database-design"),
    SkillSpec("wshobson/agents/code-refactoring"),
    SkillSpec("wshobson/agents/llm-application-dev"),
    SkillSpec("wshobson/agents/code-documentation"),
    SkillSpec("skillcreatorai/Ai-Agent-Skills/jira-issues"),
    SkillSpec("skillcreatorai/Ai-Agent-Skills/qa-regression"),
    SkillSpec("skillcreatorai/Ai-Agent-Skills/job-application"),
    SkillSpec("skillcreatorai/Ai-Agent-Skills/ask-questions-if-underspecified"),
    SkillSpec("skillcreatorai/Ai-Agent-Skills/best-practices"),
    SkillSpec("ComposioHQ/awesome-claude-skills/artifacts-builder"),
    SkillSpec("ComposioHQ/awesome-claude-skills/changelog-generator"),
    SkillSpec("ComposioHQ/awesome-claude-skills/competitive-ads-extractor"),
    SkillSpec("ComposioHQ/awesome-claude-skills/content-research-writer"),
    SkillSpec("ComposioHQ/awesome-claude-skills/developer-growth-analysis"),
    SkillSpec("ComposioHQ/awesome-claude-skills/domain-name-brainstormer"),
    SkillSpec("ComposioHQ/awesome-claude-skills/file-organizer"),
    SkillSpec("ComposioHQ/awesome-claude-skills/image-enhancer"),
    SkillSpec("ComposioHQ/awesome-claude-skills/invoice-organizer"),
    SkillSpec("ComposioHQ/awesome-claude-skills/lead-research-assistant"),
    SkillSpec("ComposioHQ/awesome-claude-skills/meeting-insights-analyzer"),
    SkillSpec("ComposioHQ/awesome-claude-skills/raffle-winner-picker"),
    SkillSpec("ComposioHQ/awesome-claude-skills/slack-gif-creator"),
    SkillSpec("ComposioHQ/awesome-claude-skills/theme-factory"),
    SkillSpec("ComposioHQ/awesome-claude-skills/video-downloader"),
]


def _utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="milliseconds").replace("+00:00", "Z")


def _safe_rmtree(path: Path) -> None:
    if not path.exists():
        return
    shutil.rmtree(path)


def _copytree(src: Path, dst: Path) -> None:
    # shutil.copytree in 3.11+ supports dirs_exist_ok, but we want a clean install.
    _safe_rmtree(dst)
    shutil.copytree(src, dst)


def _write_text(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8", newline="\n")


def _write_json(path: Path, obj: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n")


def _find_local_skill_dir(skill_name: str) -> Path | None:
    # Prefer Codex skills; fall back to any other local skill packs if present.
    candidates: list[Path] = []

    user_profile = os.environ.get("USERPROFILE")
    if user_profile:
        candidates.append(Path(user_profile) / ".codex" / "skills" / skill_name)
        candidates.append(Path(user_profile) / ".agents" / "skills" / skill_name)

    # Also consider this repo's Antigravity kit skills as source material.
    candidates.append(Path(".agent") / "skills" / skill_name)
    candidates.append(Path(".skills") / skill_name)

    for c in candidates:
        if (c / "SKILL.md").is_file():
            return c
    return None


def _make_placeholder_skill_md(spec: SkillSpec) -> str:
    return (
        "---\n"
        f"name: {spec.name}\n"
        f"description: Placeholder skill installed from {spec.identifier} (content not available offline).\n"
        f"source: {spec.identifier}\n"
        "license: unknown\n"
        "---\n\n"
        f"# {spec.name}\n\n"
        "This skill was installed as a placeholder so it appears in the local `.skills/` list.\n\n"
        "## Next step\n\n"
        f"- Replace this placeholder by importing the upstream `{spec.identifier}` skill files (SKILL.md + any scripts/resources).\n"
    )


def install_all() -> dict[str, list[str]]:
    skills_root = Path(".skills")
    skills_root.mkdir(exist_ok=True)

    installed_real: list[str] = []
    installed_placeholder: list[str] = []

    now = _utc_now_iso()

    for spec in SKILLS:
        name = spec.name
        dest_dir = skills_root / name
        local_src = _find_local_skill_dir(name)

        if local_src is not None:
            _copytree(local_src, dest_dir)
            installed_real.append(f"{name} <- {local_src.as_posix()}")
        else:
            _safe_rmtree(dest_dir)
            dest_dir.mkdir(parents=True, exist_ok=True)
            _write_text(dest_dir / "SKILL.md", _make_placeholder_skill_md(spec))
            installed_placeholder.append(name)

        # Standardize meta for discoverability in this repo.
        _write_json(
            dest_dir / ".skill-meta.json",
            {
                "source": "manual",
                "identifier": spec.identifier,
                "name": name,
                "installedAt": now,
                "updatedAt": now,
            },
        )

    return {"real": installed_real, "placeholder": installed_placeholder}


if __name__ == "__main__":
    result = install_all()
    print(json.dumps(result, ensure_ascii=False, indent=2))

