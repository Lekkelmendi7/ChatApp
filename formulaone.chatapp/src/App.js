import {Col, Row, Container } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaitingRoom from './components/waitingroom';
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

function App() {

  const [conn, setConnection] = useState();
  const joinChatRoom = async (username, chatroom) => {
    try{
      //initiate conenction
      const conn = new HubConnectionBuilder()
                          .withUrl("http://localhot:7204/chat")
                          .configureLogging(LogLevel.Information)
                          .build();

      //set up handler
      conn.on("JoinSpecificChatRoom", (username, msg) => {
        console.log("msg: ", msg);
      });

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", {username, chatroom});

      setConnection(conn);

    }catch(e){
        console.log(e);
    }
  }

  return (
    <div>
     <main>
      <Container>
      <Row class='px-5 my-5'>
        <Col sm='12'>
        <h1 className='font-weight-light'>Welcome to the F1 ChatApp</h1>
        </Col>
      </Row>
      <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
      </Container>
     </main>
    </div>
  );
}

export default App;
