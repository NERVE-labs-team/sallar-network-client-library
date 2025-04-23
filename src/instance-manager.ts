import type { io as IoType, Socket } from 'socket.io-client';
import { InvalidUrlException } from './exceptions';

/**
 * Type of handler to catch server events.
 */
export type EventHandler<T> = (
  data: T,
  self: InstanceManager
) => void | Promise<void>;

/**
 * Type to create object that allows program instance to communicate with the central server.
 */
export class InstanceManager {
  private _socket: Socket;
  private _program_id: string;
  private _worker_id: string;

  /**
   * Creates `InstanceManager` instance.
   * 
   * @param io Socket type from included socket.io library.
   */
  constructor(io: typeof IoType) {
    // Create socket connection

    this._socket = io();

    // Get instance data

    const [_, urlInfo] = window.location.href.split('#');
    const [program_id, worker_id] = urlInfo.split(',');

    if (!program_id || !worker_id)
      throw new InvalidUrlException(
        'Cannot get "program_id" or/and "worker_id" from url'
      );

    this._program_id = program_id;
    this._worker_id = worker_id;

    // Emit instance-launched signal

    this.socket.emit('instance-launched', {
      worker_id,
    });
  }

  /**
   * Socket instance.
   */
  get socket(): Socket {
    return this._socket;
  }

  /**
   * Program id.
   */
  get program_id(): string {
    return this._program_id;
  }

  /**
   * Worker id.
   */
  get worker_id(): string {
    return this._worker_id;
  }

  /**
   * Listens for specific messages from server.
   *
   * @param event Event name.
   * @param handler Callback to handle the event.
   */
  on<T>(event: string, handler: EventHandler<T>) {
    this.socket.on(event, (data) => handler(data, this));
  }

  /**
   * Emits a message to server.
   *
   * @param event Event name.
   * @param data Event payload.
   */
  emit(event: string, data: object | null) {
    this.socket.emit(event, { ...data, worker_id: this.worker_id });
  }
}
