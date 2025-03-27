# Nodes

## Overview

The `Nodes` functionality displays a list of nodes, allowing administrators to view, search, and edit node details. It fetches data from an API and provides a user-friendly interface for managing nodes.

## Features

- **Data Fetching**: Retrieves node data from the API endpoint `/api/nodes`.
- **Search Functionality**: Allows users to filter nodes based on various attributes.
- **Edit Functionality**: Enables users to edit node details directly in the table.

## State Management

The following state variables are used:

- `nodesData`: Stores the list of nodes fetched from the API.
- `error`: Holds any error messages encountered during data fetching.
- `isLoading`: Indicates whether the data is currently being loaded.
- `searchTerms`: An array of search terms used for filtering nodes.
- `editableNode`: Stores the node currently being edited.

## API Interaction

### Fetching Nodes

Nodes are fetched using the `fetchNodes` function, which makes a GET request to the `/api/nodes` endpoint. The fetched data is stored in the `nodesData` state.

### Updating Nodes

When a user edits a node and clicks the save button, the `handleSaveClick` function is called. This function:

1. Prepares the updated node data.
2. Sends a POST request to the API endpoint `/api/nodes/update/{node.id}` with the updated data.
3. Updates the local state to reflect the changes.

## Search Functionality

Users can add search terms by typing in the search input and pressing "Enter". The search terms are stored in the `searchTerms` state and are used to filter the displayed nodes based on the following attributes:

- Hostname
- ID
- IP Address
- OS
- Role
- State
- Created At
- Updated At

## Rendering

A table displays the following columns:

- **Hostname**
- **ID**
- **IP Address**
- **OS**
- **Role**
- **State**
- **Created At**
- **Updated At**
- **Edit Button**
- **Delete Button**

### Edit and Delete Buttons

- **Edit Button**: When clicked, it allows the user to edit the corresponding node's details.
- **Delete Button**: Currently, the delete functionality is not implemented but is represented by a button with a trash icon.

## Loading and Error States

- While data is being loaded, a loading message is displayed.
- If an error occurs during data fetching, an error message is shown to the user.

## Conclusion

The `Nodes` functionality provides a comprehensive interface for managing nodes within the application. Its features, including data fetching, search, and edit capabilities, make it a valuable tool for administrators.