// Info is lowest level, then error, debug logs everything
type LogLevel = 'info' | 'warning' | 'error';

export class Logger {
 private logLevel: LogLevel;

 constructor() {
  this.logLevel = 'info'; // TODO: Set log level from environment variable
 }

 info(message: string) {
  console.log(message);
 }

 warning(message: string) {
  if (this.logLevel === 'info') {
   return;
  }
  console.warn(message);
 }

 error(message: string) {
  if (this.logLevel === 'info' || this.logLevel === 'warning') {
   return;
  }
  console.error(message);
 }
}
