# n8n-nodes-logger

This is an n8n community node. It lets you execute a logger workflow which you can configure however you want.
After the logger is done, it will automatically continue the flow without altering the incomming data.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Developer

Hi, 

My name is Bram and I am the developer of this node.
I am an independant consultant and expert partner of n8n.
My nodes are free to use for everyone, but please consider [donating](https://www.paypal.com/donate/?business=Y29D6N9JNTWCA&no_recurring=0&item_name=n8n+Community+Donation%2C%0ANodes+and+Support&currency_code=EUR) when you use my nodes.
This helps me to build and maintain nodes for everyone to use.

If you are looking for some outside help with n8n, I can of course also offer my services.
* Node Development
* Workflow Development
* Mentoring
* Support

Please contact me @ bram@knitco.nl if you want to make use of my services.

For questions or issues with nodes, please open an issue on Github.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Compatibility

Developed and tested using n8n version 0.221.2

## Usage

You need to set the workflow ID of the logger workflow, select the data to be sent, and you can also set extra values to be sent to the Logger workflow.

Note: not all screenshots are made with the latest version of the node. So things might have changed in the node you are actually going to be using.

![Overview](https://github.com/bramkn/n8n-nodes-logger/blob/master/img/nodeOverview.png)

### Data coming into the node will also be output

![InputOutput](https://github.com/bramkn/n8n-nodes-logger/blob/master/img/inputOutput.png)

### Data sent to the logger workflow options:

#### First Item

![firstitem](https://github.com/bramkn/n8n-nodes-logger/blob/master/img/firstItem.png)

#### All Items

![allitems](https://github.com/bramkn/n8n-nodes-logger/blob/master/img/allItems.png)

#### 1 Item With Aggregated Item Values Array

![itemArray](https://github.com/bramkn/n8n-nodes-logger/blob/master/img/itemArray.png)

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## Version history

* v1.0 - first version
* v1.1 - done
