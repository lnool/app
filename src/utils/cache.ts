export default class LocalCache {
  static set(key: string, value: unknown): void {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  static get(key: string): any {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
    return undefined
  }

  static delete(key: string): void {
    window.localStorage.removeItem(key)
  }

  static clear(): void {
    window.localStorage.clear()
  }
}
