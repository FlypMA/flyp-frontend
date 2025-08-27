import { useState, useEffect } from 'react';
import { WebSocketMessage } from '@api/websocket';

interface WebSocketState {
  messages: WebSocketMessage | null;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
}

export const useWebSocket = (url: string) => {
  const [state, setState] = useState<WebSocketState>({
    messages: null,
    connectionStatus: 'connecting',
  });

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setState(prev => ({ ...prev, connectionStatus: 'connected' }));
    };

    ws.onmessage = event => {
      const data = JSON.parse(event.data);
      setState(prev => ({ ...prev, messages: data }));
    };

    ws.onerror = () => {
      setState(prev => ({ ...prev, connectionStatus: 'error' }));
    };

    ws.onclose = () => {
      setState(prev => ({ ...prev, connectionStatus: 'disconnected' }));
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return state;
};
