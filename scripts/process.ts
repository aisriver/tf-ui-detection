/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-12-20 00:32:22
 * @LastEditors: 廖军
 * @LastEditTime: 2020-12-20 00:34:20
 */
import { exec, ExecSyncOptions, ChildProcess } from 'child_process';

export interface ExecReturn {
	error: Error;
	stdout: string | Buffer;
	stderr: string | Buffer;
	childProcess: ChildProcess;
}

export const execPromise = (command: string, option?: ExecSyncOptions) =>
	new Promise((resolve: (result: ExecReturn) => void) => {
		console.log('[COMMAND]: ' + command);
		const childProcess = exec(
			command,
			{ timeout: 1000 * 60 * 10, maxBuffer: 5 * 1024 * 1024, ...option },
			(error: Error, stdout: string | Buffer, stderr: string | Buffer) => {
				resolve({ error, stdout, stderr, childProcess });
			}
		);
		childProcess.stdout.on('data', data => {
			console.log('[STDOUT]: ' + data);
		});
		childProcess.stderr.on('data', data => {
			console.log('[STDERR]: ' + data);
		});
		childProcess.on('exit', data => {
			console.log('[EXIT]: ' + data);
		});
		childProcess.on('close', data => {
			console.log('[CLOSE]: ' + data);
		});
	});
