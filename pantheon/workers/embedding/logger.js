/**
 * Logger padronizado para workers de embedding
 * 
 * @module workers/embedding/logger
 */

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

class Logger {
  constructor(context = 'embedding') {
    this.context = context;
    this.level = LOG_LEVELS[process.env.LOG_LEVEL || 'info'];
  }

  /**
   * Formata mensagem de log
   */
  _format(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const metaStr = Object.keys(meta).length > 0 
      ? ` | ${JSON.stringify(meta)}` 
      : '';
    
    return `[${timestamp}] [${level.toUpperCase()}] [${this.context}] ${message}${metaStr}`;
  }

  /**
   * Log de erro
   */
  error(message, meta = {}) {
    if (this.level >= LOG_LEVELS.error) {
      console.error(this._format('error', message, meta));
    }
  }

  /**
   * Log de warning
   */
  warn(message, meta = {}) {
    if (this.level >= LOG_LEVELS.warn) {
      console.warn(this._format('warn', message, meta));
    }
  }

  /**
   * Log de info
   */
  info(message, meta = {}) {
    if (this.level >= LOG_LEVELS.info) {
      console.log(this._format('info', message, meta));
    }
  }

  /**
   * Log de debug
   */
  debug(message, meta = {}) {
    if (this.level >= LOG_LEVELS.debug) {
      console.log(this._format('debug', message, meta));
    }
  }

  /**
   * Cria child logger com contexto adicional
   */
  child(subContext) {
    return new Logger(`${this.context}:${subContext}`);
  }
}

// Singleton para uso global
const logger = new Logger();

module.exports = {
  Logger,
  logger
};
