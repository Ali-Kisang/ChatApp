# ChatApp

ChatApp is a full-stack web application built using the MERN (MongoDB, Express, React, Node.js) stack that enables private one-on-one chat between users, including real-time messaging and video/audio calls using Agora.io. The app also uses Socket.io for real-time communication and is styled using Tailwind CSS.

## Features

- **Private Chat**: Users can engage in one-on-one private conversations.
- **Real-time Messaging**: Chat updates instantly using Socket.io without page reloads.
- **Video & Audio Calls**: Users can make video or audio calls via Agora.io.
- **Responsive Design**: Styled using Tailwind CSS to ensure responsiveness across devices.
- **Backend with MongoDB**: MongoDB is used to store message history and chat information.

## Tech Stack

- **Frontend**: React, Tailwind CSS, Socket.io-client, Agora SDK
- **Backend**: Node.js, Express, MongoDB, Socket.io, Agora Access Token Service
- **Real-time Communication**: Socket.io for messaging, Agora for video/audio calls

## Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js**: v14 or higher
- **MongoDB**: A running MongoDB instance
- **Agora Account**: Sign up at [Agora.io](https://www.agora.io/) to get your App ID and App Certificate.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chatapp.git
cd chatapp

### 2. Set up the server

Navigate to the `server` directory and install dependencies:

```bash
cd server
npm install

