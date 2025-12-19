# Reasoning & Approach – ReactFlow Canvas

## Overview
This project implements an interactive application graph builder using ReactFlow. 
The goal was to visualize service dependencies for multiple applications with a clean, 
responsive, and maintainable frontend architecture.

## Tech Stack Decisions
- **React + Vite**: Fast development and modern build tooling
- **TypeScript (strict)**: Type safety and better maintainability
- **ReactFlow (xyflow)**: Handles node-based canvas interactions such as dragging, zooming, and panning
- **shadcn/ui + Tailwind CSS**: Consistent and reusable UI components
- **TanStack Query**: Manages server-like state (apps list, graph data) with caching and refetching
- **Zustand**: Lightweight global state for UI-specific data

## State Management
- **TanStack Query** is used for server data:
  - Applications list
  - Graph nodes and edges per application
- **Zustand** is used for UI state:
  - selectedAppId
  - selectedNodeId
  - mobile panel visibility
  - active inspector tab

This separation keeps server state and UI state cleanly decoupled.

## UI Structure
- **TopBar**: App selector and global actions
- **Left Rail**: Static navigation icons
- **Center Canvas**: ReactFlow graph with dotted background
- **Right Panel**: Node inspector and application details
- **Mobile Menu**: Slide-over panel for smaller screens

## Key Design Decisions
- Auto-select first app on load for better UX
- Cached graph data per app to avoid unnecessary refetches
- Responsive layout with conditional panels
- Modular component structure for readability and scalability

## Conclusion
The implementation focuses on clarity, maintainability, and correct ReactFlow interactions 
while closely following the given constraints and requirements.
