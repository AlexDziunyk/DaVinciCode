// GoogleCallback.jsx

import React, { useEffect } from 'react';

const GoogleCallback = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetch('/auth/google/callback?code=' + code)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // Можно выполнить другие действия, например, перенаправить на главную страницу
          window.location.href = '/';
        })
        .catch(error => {
          console.error('Error:', error);
          // Обработка ошибки (например, перенаправление на страницу ошибки)
          window.location.href = '/error';
        });
    } else {
      // Если код не найден в URL, перенаправить на страницу ошибки
      window.location.href = '/error';
    }
  }, []);

  return <div>Processing...</div>;
};

export default GoogleCallback;
