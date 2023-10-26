import React, {useState} from 'react';

const TaskNotification = () => {
    const [username, setUsername] = useState<string | undefined>("");
    return (
        <div>

        </div>
    );
};

export default TaskNotification;

/*
import React from 'react';
import { Client } from '@stomp/stompjs';

interface Props {
  userId: string;
}

interface State {
  notification: string;
}

class NotificationComponent extends React.Component<Props, State> {
  private client!: Client;

  constructor(props: Props) {
    super(props);
    this.state = {
      notification: '',
    };
  }

  componentDidMount() {
    const { userId } = this.props;

    this.client = new Client({
      brokerURL: `ws://localhost:8080/staff/task-processing/user-${userId}`,
      onConnect: () => {
        this.client.subscribe(`/staff/task-processing/user-${userId}`, (message) => {
          if (message.body) {
            this.setState({ notification: message.body });
          }
        });
      },
    });

    this.client.activate();
  }

  componentWillUnmount() {
    this.client.deactivate();
  }

  render() {
    return (
      <div>
        {this.state.notification && (
          <div className="notification">
            {this.state.notification}
          </div>
        )}
      </div>
    );
  }
}

export default NotificationComponent;

* */