(function(socket) {
  function parseErrors(results) {
    const errors = [];

    results.forEach((file) => {
      errors.push(`BrowserSync: ESLint ${file.filePath}`);

      file.messages.forEach((message) => {
        errors.push(`${message.line}:${message.column} - ${message.message}`);
      });
    });

    return errors;
  }

  socket.on('msg:eslint', (results) => {
    const newErrors = results.filter((obj) => obj.errorCount > 0);
    const newWarnings = results.filter((obj) => obj.warningCount > 0);

    parseErrors(newErrors).forEach((error) => {
      console.log(` 🚨 ${error}`);
    });
    parseErrors(newWarnings).forEach((warning) => {
      console.log(` ⚠️ ${warning}`);
    });
  });

})(window.___browserSync___.socket);
