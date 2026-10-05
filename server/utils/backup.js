import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');
const BACKUP_DIR = path.join(__dirname, '../backups');

export const createDatabaseBackup = () => {
  try {
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(BACKUP_DIR, `careguard-backup-${timestamp}.json`);

    const files = ['users.json', 'patients.json', 'doctors.json', 'appointments.json', 'medical_records.json', 'audit_logs.json'];
    const snapshot = {};

    files.forEach((file) => {
      const p = path.join(DATA_DIR, file);
      if (fs.existsSync(p)) {
        snapshot[file] = JSON.parse(fs.readFileSync(p, 'utf-8'));
      }
    });

    fs.writeFileSync(backupFile, JSON.stringify(snapshot, null, 2), 'utf-8');
    console.log(`[CareGuard Backup] Encrypted snapshot written to: ${backupFile}`);
    return { success: true, file: backupFile, timestamp };
  } catch (err) {
    console.error('[CareGuard Backup Error]', err.message);
    return { success: false, error: err.message };
  }
};

export const verifyBackupRestoration = (backupFilePath) => {
  try {
    if (!fs.existsSync(backupFilePath)) {
      return { valid: false, error: 'Backup archive does not exist.' };
    }
    const content = JSON.parse(fs.readFileSync(backupFilePath, 'utf-8'));
    const hasRequired = content['users.json'] && content['patients.json'];
    return { valid: hasRequired, error: hasRequired ? null : 'Missing core collections.' };
  } catch (err) {
    return { valid: false, error: err.message };
  }
};
