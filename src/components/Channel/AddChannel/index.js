import React, { Component } from 'react';
import { joinChannel, messageRepo } from '../../../EkoSDK';

class AddChannel extends Component {
    updateMessages = (Value) => {
        const messages = messageRepo.messagesForChannel({ channelId: Value });
        messages.once('dataUpdated', data => {
            data.map(message =>
                this.props.loadMessage(message.data.text, message.userId)
            );
            messages.removeAllListeners('dataUpdated');
        });
    }

    existingChannel = (Value) => {
        const allChannels = this.props.channels
        return allChannels.some(channel => {
            return channel.channel.toLowerCase() === Value.toLowerCase()
        })
    }

    render() {
        let input;
        return (
            <section id="add-channel">
                <input placeholder="Add Channel"
                    onKeyPress={e => {
                        if (e.key === 'Enter' && input.value !== '') {
                            if (!(this.existingChannel(input.value))) {
                                this.props.unloadMessage();
                                this.props.setChannel(input.value);
                                this.props.setCurrentChannel(input.value);
                                joinChannel(input.value);
                                this.updateMessages(input.value);
                            }
                            input.value = '';
                        }
                    }}
                    type="text"
                    ref={node => {
                        input = node;
                    }}
                />
            </section>
        );
    };
};

export default AddChannel;