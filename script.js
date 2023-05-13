document.addEventListener('DOMContentLoaded', function() {
  var chatBox = document.getElementById('chatBox');
  
  // Fetch existing messages
  fetch('/messages')
    .then(function(response) {
      return response.json();
    })
    .then(function(messages) {
      messages.forEach(function(message) {
        var newMessage = createMessageElement(message.username, message.content);
        chatBox.appendChild(newMessage);
      });
      
      // Scroll to the bottom of the chat box
      chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(function(error) {
      console.log('Error retrieving messages:', error);
    });
  
  document.getElementById('sendButton').addEventListener('click', function() {
    var messageInput = document.getElementById('messageInput');
    var messageContent = messageInput.value;

    if (messageContent.trim() !== '') {
      var newMessage = createMessageElement('You', messageContent);
      chatBox.appendChild(newMessage);

      // Scroll to the bottom of the chat box
      chatBox.scrollTop = chatBox.scrollHeight;

      // Send the message to the server
      fetch('/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: 'You', content: messageContent })
      })
        .then(function(response) {
          if (response.ok) {
            messageInput.value = '';
            messageInput.focus();
          } else {
            console.log('Error sending message:', response.status);
          }
        })
        .catch(function(error) {
          console.log('Error sending message:', error);
        });
    }
  });
  
  function createMessageElement(username, content) {
    var message = document.createElement('div');
    message.classList.add('message');
    message.innerHTML = '<span class="username">' + username + ':</span><span class="content">' + content + '</span>';
    return message;
  }
});
