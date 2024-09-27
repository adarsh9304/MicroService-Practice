const http=require('http');
const {io:Client}=require('socket.io-client')

function orderSocket(){
    const customerSocket=Client('ws://localhost:3005');
    
    customerSocket.on('connect', () => {
      console.log('Order service connected to customer service socket');
    });
    
    customerSocket.on('status-update',(data)=>{
      console.log('Received status update from customer service:',data)
      customerSocket.emit('status-update-response',{received:true})
    })
}

module.exports={
    orderSocket
}