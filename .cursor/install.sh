#!/usr/bin/env bash
# Idempotent dev environment setup for the Compass UI Mattermost plugin.
# Provides the Go and Node toolchains the project pins, then installs webapp deps.
set -euo pipefail

GO_VERSION="1.25.1"
NODE_VERSION="24.13.1"
NVM_VERSION="v0.40.3"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
GO_DIR="${HOME}/go1.25"

log() { printf '\n[install] %s\n' "$1"; }

# --- Go toolchain (go.mod requires go 1.25; the base image ships an older Go
#     and cannot auto-download the 1.25 toolchain in this network) ---
if ! "${GO_DIR}/bin/go" version 2>/dev/null | grep -q "go${GO_VERSION} "; then
  log "Installing Go ${GO_VERSION} into ${GO_DIR}"
  rm -rf "${GO_DIR}"
  mkdir -p "${GO_DIR}"
  curl -fsSL "https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz" \
    | tar -C "${GO_DIR}" --strip-components=1 -xz
else
  log "Go ${GO_VERSION} already present"
fi

# --- Node toolchain (.nvmrc pins ${NODE_VERSION}) via nvm ---
export NVM_DIR="${HOME}/.nvm"
if [ ! -s "${NVM_DIR}/nvm.sh" ]; then
  log "Installing nvm ${NVM_VERSION}"
  curl -fsSL "https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_VERSION}/install.sh" | bash
fi
# shellcheck disable=SC1091
. "${NVM_DIR}/nvm.sh"
if ! nvm which "${NODE_VERSION}" >/dev/null 2>&1; then
  log "Installing Node ${NODE_VERSION}"
  nvm install "${NODE_VERSION}"
fi
nvm alias default "${NODE_VERSION}" >/dev/null
nvm use "${NODE_VERSION}" >/dev/null
NODE_BIN="$(dirname "$(nvm which "${NODE_VERSION}")")"

# --- Make both toolchains take precedence in future interactive shells ---
MARKER="# >>> compass-ui-plugin dev env >>>"
if ! grep -qF "${MARKER}" "${HOME}/.bashrc" 2>/dev/null; then
  log "Registering toolchains on PATH in ~/.bashrc"
  cat >> "${HOME}/.bashrc" <<EOF

${MARKER}
export PATH="${GO_DIR}/bin:${NODE_BIN}:\$PATH"
# <<< compass-ui-plugin dev env <<<
EOF
fi

export PATH="${GO_DIR}/bin:${NODE_BIN}:${PATH}"

log "Toolchain versions:"
go version
node --version
npm --version

# --- Webapp dependencies ---
log "Installing webapp dependencies"
cd "${REPO_ROOT}/webapp"
npm install

log "Environment setup complete."
