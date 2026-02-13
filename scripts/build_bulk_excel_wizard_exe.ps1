param(
  [string]$Name = "VeralTopluUrunExcel",
  [string]$Entry = "scripts\\bulk_excel_wizard.py"
)

$ErrorActionPreference = "Stop"

Write-Host "Building EXE with PyInstaller..."

if (!(Test-Path $Entry)) {
  throw "Entry script not found: $Entry"
}

if (!(Get-Command py -ErrorAction SilentlyContinue)) {
  throw "Python launcher (py) not found. Install Python for Windows first."
}

# Create venv
if (!(Test-Path ".venv-exe")) {
  py -3 -m venv .venv-exe
}

$python = Join-Path (Resolve-Path ".venv-exe").Path "Scripts\\python.exe"
if (!(Test-Path $python)) {
  throw "Venv python not found: $python"
}

& $python -m pip install --upgrade pip
& $python -m pip install openpyxl pyinstaller

# Clean old outputs
if (Test-Path "dist") { Remove-Item -Recurse -Force "dist" }
if (Test-Path "build") { Remove-Item -Recurse -Force "build" }

# Build
& $python -m PyInstaller `
  --onefile `
  --noconsole `
  --clean `
  --name $Name `
  --paths "scripts" `
  $Entry

Write-Host "Done. Output: dist\\$Name.exe"

