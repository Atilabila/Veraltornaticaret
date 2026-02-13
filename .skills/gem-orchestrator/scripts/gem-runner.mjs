import fs from "fs";
import path from "path";
import process from "process";
import yaml from "js-yaml";

const ROOT = path.resolve(process.cwd(), ".skills", "gem-orchestrator");
const RES = path.join(ROOT, "resources");
const STATE_DIR = path.join(ROOT, "state");
const STATE_FILE = path.join(STATE_DIR, "answers.json");

function readYaml(p) {
  return yaml.load(fs.readFileSync(p, "utf8"));
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function loadAnswers() {
  ensureDir(STATE_DIR);
  if (!fs.existsSync(STATE_FILE)) return {};
  return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
}

function saveAnswers(obj) {
  ensureDir(STATE_DIR);
  fs.writeFileSync(STATE_FILE, JSON.stringify(obj, null, 2), "utf8");
}

function setDeep(obj, keyPath, value) {
  const parts = keyPath.split(".");
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    cur[parts[i]] = cur[parts[i]] ?? {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
}

function getDeep(obj, keyPath) {
  const parts = keyPath.split(".");
  let cur = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  return cur;
}

function dorCheck(dor, answers) {
  const failures = [];
  for (const gate of dor.gates ?? []) {
    for (const item of gate.items ?? []) {
      if (!item.required) continue;
      const keys = item.verify_from_answers ?? [];
      const ok = keys.every((k) => {
        const v = getDeep(answers, k);
        if (Array.isArray(v)) return v.length > 0;
        return v !== undefined && v !== null && String(v).trim() !== "";
      });
      if (!ok) {
        failures.push({
          id: item.id,
          message: item.fail_message ?? "DoR item failed",
          need: keys,
        });
      }
    }
  }
  return failures;
}

function pickNextQuestion(q, answers) {
  for (const section of q.sections ?? []) {
    for (const qu of section.questions ?? []) {
      if (!qu.required) continue;
      const existing = getDeep(answers, qu.id);
      const done =
        existing !== undefined &&
        existing !== null &&
        (Array.isArray(existing) ? existing.length > 0 : String(existing).trim() !== "");
      if (!done) return qu;
    }
  }
  return null;
}

function matchCondition(cond, answers) {
  // minimal matcher: equals/contains_text/not_empty
  if (cond.equals) {
    const { question, value, contains } = cond.equals;
    const v = getDeep(answers, question);
    if (contains) return Array.isArray(v) ? v.includes(contains) : String(v).includes(contains);
    if (value !== undefined) return String(v) === String(value);
    return false;
  }
  if (cond.contains_text) {
    const { question, text } = cond.contains_text;
    const v = getDeep(answers, question);
    return (v ?? "").toString().toLowerCase().includes(text.toLowerCase());
  }
  if (cond.not_empty) {
    const { question } = cond.not_empty;
    const v = getDeep(answers, question);
    return v !== undefined && v !== null && String(v).trim() !== "";
  }
  return false;
}

function pickPipeline(skillMap, answers) {
  for (const p of skillMap.pipelines ?? []) {
    const when = p.when ?? {};
    const any = when.any ?? [];
    const all = when.all ?? [];
    const anyOk = any.length === 0 ? true : any.some((c) => matchCondition(c, answers));
    const allOk = all.every((c) => matchCondition(c, answers));
    if (anyOk && allOk) return p;
  }
  return null;
}

function emitPrompts(pipeline) {
  console.log("\n=== PIPELINE ===");
  console.log(`${pipeline.id}: ${pipeline.title}\n`);
  console.log("=== STEPS (copy/paste into Codex) ===\n");
  for (const step of pipeline.steps ?? []) {
    console.log(`--- Step: ${step.id} ---`);
    console.log(`SKILL: ${step.skill}`);
    console.log(`PURPOSE: ${step.purpose}`);
    console.log("");
  }
}

function usage() {
  console.log(`
Usage:
  node .skills/gem-orchestrator/scripts/gem-runner.mjs ask
  node .skills/gem-orchestrator/scripts/gem-runner.mjs answer <question_id> "<your answer>"
  node .skills/gem-orchestrator/scripts/gem-runner.mjs dor
  node .skills/gem-orchestrator/scripts/gem-runner.mjs plan

Notes:
- Answers are saved to .skills/gem-orchestrator/state/answers.json
`);
}

const cmd = process.argv[2];

const q = readYaml(path.join(RES, "questionnaire.yml"));
const dor = readYaml(path.join(RES, "dor_checklist.yml"));
const skillMap = readYaml(path.join(RES, "skill_map.yml"));
const answers = loadAnswers();

if (!cmd) {
  usage();
  process.exit(0);
}

if (cmd === "ask") {
  const nextQ = pickNextQuestion(q, answers);
  if (!nextQ) {
    console.log("All required questions answered.");
    process.exit(0);
  }
  console.log(`QUESTION_ID: ${nextQ.id}`);
  console.log(nextQ.ask);
  if (nextQ.options) console.log(`Options: ${nextQ.options.join(", ")}`);
  process.exit(0);
}

if (cmd === "answer") {
  const qid = process.argv[3];
  cons
