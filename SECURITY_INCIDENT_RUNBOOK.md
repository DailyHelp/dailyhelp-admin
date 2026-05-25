# Security Incident Runbook (DailyHelp Admin)

This runbook is for active server compromise events.

## 1) Immediate containment

1. Remove the host from public traffic immediately.
2. Block outbound traffic except what is strictly required for recovery.
3. Stop the app process and any unknown processes.
4. Snapshot disks/memory for forensics before wiping (if required by policy).

## 2) Assume secret compromise

Rotate all credentials that ever touched the compromised host:

1. GitHub Actions deploy key(s)
2. SSH keys for deploy/admin users
3. Cloud/API credentials in `.env` and CI secrets
4. Any database, Redis, queue, storage, and third-party tokens
5. Session/auth signing keys

## 3) Rebuild, do not “clean in place”

1. Provision a fresh VM from a trusted base image.
2. Patch OS packages fully.
3. Create a new non-root deploy user.
4. Reinstall only required runtime components (Node, PM2, nginx/caddy).
5. Restore app from trusted Git commit + fresh CI artifact.

Do not reuse the old server image.

## 4) SSH hardening baseline

Set in `sshd_config` (or equivalent):

1. `PermitRootLogin no`
2. `PasswordAuthentication no`
3. `PubkeyAuthentication yes`
4. `PermitEmptyPasswords no`
5. `MaxAuthTries 3`
6. `AllowUsers <deploy-user>`

Then restart SSH and verify access.

## 5) Network controls

1. Inbound: allow only required ports (typically 22, 80, 443).
2. Outbound: default deny; allow only DNS, package mirrors, required APIs.
3. Enable brute-force protection (`fail2ban` or provider equivalent).
4. Enable host-level malware scanning and process monitoring.

## 6) CI/CD hardening requirements

This repo deploy workflow now enforces:

1. Artifact-only deployment (not full source rsync)
2. Strict SSH host-key verification via `SSH_HOST_KEY` secret
3. Minimal workflow token permissions
4. Serialized deploy concurrency
5. Early validation for required env secrets

Required GitHub Secrets:

1. `NEXT_PUBLIC_API_BASE_URL`
2. `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
3. `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
4. `SSH_HOST`
5. `SSH_PORT`
6. `SSH_USER`
7. `SSH_KEY`
8. `SSH_HOST_KEY`

## 7) Post-rebuild validation

1. Confirm no unknown `cron`, systemd, profile/startup entries.
2. Confirm only expected PM2 processes are running.
3. Confirm no unexpected binaries under app/release/tmp/home dirs.
4. Review auth logs for failed/suspicious login attempts.
5. Place host under monitoring before re-enabling full public traffic.

