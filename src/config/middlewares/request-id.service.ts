import { Injectable } from '@nestjs/common';

@Injectable()
export class RequestIdService {
  private requestId: string = '';

  setRequestId(requestId: string) {
    this.requestId = requestId;
  }

  getRequestId(): string {
    return this.requestId || 'no-request-id';
  }
}