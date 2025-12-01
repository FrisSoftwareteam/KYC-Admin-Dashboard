import { useEffect, useState } from 'react';
import { ably } from '.';

export const useAbly = () => {
  const [message, setMessage] = useState<any>({ data: null, open: false });

  useEffect(() => {
    // ably.connection.on('connected', (message) => {
    //   console.log('Connected to Ably!', message);
    // });

    const channel: any = ably.channels.get(
      'firstcheck.firstregistrars.admin.channel'
    );
    channel.subscribe(
      'firstcheck.firstregistrars.admin.eventId',
      (message: any) => {
        setMessage({ data: message?.data, open: true });
      }
    );

    return () => {
      channel.unsubscribe('firstcheck.firstregistrars.admin.eventId');
    };
  }, []);

  const handleClose = () => {
    setMessage({ data: null, open: false });
  };

  return { message, handleClose };
};
