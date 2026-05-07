import { promises as fs } from 'fs'
import path from 'path'

const CONTENT_ROOT = path.join(process.cwd(), 'content')

export function getContentPath(...segments: string[]) {
  return path.join(CONTENT_ROOT, ...segments)
}

export async function pathExists(...segments: string[]) {
  try {
    await fs.access(getContentPath(...segments))
    return true
  } catch {
    return false
  }
}

export async function readContentFile(...segments: string[]) {
  return fs.readFile(getContentPath(...segments), 'utf8')
}

export async function readContentJson<T>(...segments: string[]) {
  return JSON.parse(await readContentFile(...segments)) as T
}

export async function listContentDirectory(...segments: string[]) {
  try {
    return await fs.readdir(getContentPath(...segments))
  } catch {
    return []
  }
}