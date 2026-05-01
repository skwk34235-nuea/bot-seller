(function () {
  if (typeof io === 'undefined') {
    return;
  }

  const socket = io({
    withCredentials: true
  });

  const dot = document.getElementById('socketStatusDot');
  const text = document.getElementById('socketStatusText');

  function setStatus(message, color) {
    if (text) {
      text.textContent = message;
    }
    if (dot) {
      dot.style.background = color;
    }
  }

  socket.on('connect', function () {
    setStatus('Socket connected', '#22c55e');
    socket.emit('client:ping', { from: 'browser' });
  });

  socket.on('disconnect', function () {
    setStatus('Socket disconnected', '#ef4444');
  });

  socket.on('server:welcome', function (payload) {
    window.__socketWelcome = payload;
  });

  socket.on('server:pong', function (payload) {
    window.__lastSocketPong = payload;
  });

  socket.on('chat:message', function (payload) {
    window.__lastRealtimeMessage = payload;
    document.dispatchEvent(new CustomEvent('socket:message', { detail: payload }));
  });

  socket.on('notify:admin', function (payload) {
    document.dispatchEvent(new CustomEvent('socket:admin-message', { detail: payload }));
  });

  window.appSocket = socket;
})();
