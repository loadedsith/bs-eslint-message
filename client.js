(function (socket) {

  socket.on('msg:eslint', results => {
    const newErrors = results.filter(obj => obj.errorCount > 0)

    if (results.log) {
      parseErrors(newErrors).forEach((error) => {
        console.log(error)
      });
    }
  })

  function parseErrors (results) {
    const errors = []
    results.forEach(file => {
      errors.push(`BrowserSync: ESLint ${file.filePath}`)
      console.log(`file`, file);
      file.messages.forEach(message => {
        errors.push(`--🚨 ${message.line}:${message.column} - ${message.message}`)
      })
    })
    return errors
  }

  function addMessage ({ title, body }) {
    console.log(`${title}: ${body}`)
  }

})(window.___browserSync___.socket);
