import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import { MessageRepository, EkoLoadingStatus } from 'eko-sdk';

import Message from './Message'


class MessagesList extends Component {
  constructor(props) {
    super(props);
    this.messageCollection = undefined;
    this.messageRepo = new MessageRepository();
    this.state = {
      messages: [],
      hasMore: false,
    };
  }

  componentDidMount() {
    this.resetMessageCollection();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.currentChannelId !== state.prevChannelId) {
      return {
        messages: [],
        hasMore: false,
        prevChannelId: props.currentChannelId,
      };
    }

    return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentChannelId !== this.props.currentChannelId) {
      this.resetMessageCollection();
    }
  }

  componentWillUnmount() {
    this.messageCollection && this.messageCollection.dispose();
  }

  // Render messages in Channel
  resetMessageCollection = () => {
    this.messageCollection && this.messageCollection.dispose();
    // Get messages in selected Channel
    this.messageCollection = this.messageRepo.messagesForChannel({ channelId: this.props.currentChannelId });
    console.log(1, this.messageCollection)

    // Once message data is received, run the following code.
    this.messageCollection.on('dataUpdated', data => {
      this.setState({ messages: data });
    });

    this.messageCollection.on('loadingStatusChanged', ({ newValue }) => {
      if (newValue === EkoLoadingStatus.Loaded) {
        this.setState({ hasMore: this.messageCollection.hasMore });
      }
    });
  }

  loadMore = () => {
    if (this.state.hasMore) {
      this.messageCollection.nextPage();
    }
  }

  render() {
    return (
      <div id="message-infinite-scroll-wrapper">
        <InfiniteScroll
          loadMore={() => this.state.hasMore && this.messageCollection.nextPage()}
          hasMore={this.state.hasMore}
          useWindow={false}
          isReverse
        >
          <ul id="message-list">
            {this.state.messages.map(message => (
              <Message
                key={message.messageId}
                {...message}
              />
            ))}
          </ul>
        </InfiniteScroll>
      </div>
    );
  };
};

export default MessagesList