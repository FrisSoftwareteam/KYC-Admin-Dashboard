import { env } from '@/shared/constants/env';
import { Realtime } from 'ably';

export const ably = new Realtime(env.ABLY_KEY);

export const subscribeToChannel = (
  channelName: string,
  callback: (data: any) => void
) => {
  const channel: any = ably.channels.get(channelName);
  channel.subscribe(
    'firstcheck.firstregistrars.admin.eventId',
    (message: { data: any }) => {
      callback(message.data);
    }
  );
};
