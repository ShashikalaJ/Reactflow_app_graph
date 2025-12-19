# ReactFlow Canvas – App Graph Builder

A small frontend application that visualizes application service dependencies using ReactFlow.  
Built as part of a frontend intern take-home task.

---

## 🚀 Tech Stack

- React + Vite  
- TypeScript (strict mode)  
- ReactFlow (xyflow)  
- shadcn/ui  
- TanStack Query  
- Zustand  
- Tailwind CSS  

---

## ✨ Features

- Dotted canvas with draggable service nodes  
- Zoom, pan, and fit-view support  
- Application selector with multiple apps  
- Node inspector with status, tabs, and synced slider/input  
- Responsive layout with mobile slide-over panel  
- Mock API integration using TanStack Query  
- Global UI state managed with Zustand  

---

## 🧱 Layout Structure

- **Top Bar**: App selector, actions, and fit-view button  
- **Left Rail**: Static icon navigation  
- **Center Canvas**: ReactFlow graph with dotted background  
- **Right Panel**:
  - Application list  
  - Node inspector (visible on node selection)  

---

## 🔄 Data Fetching (TanStack Query)

Mock APIs are used to simulate backend behavior:

- `GET /apps` – fetch list of applications  
- `GET /apps/:appId/graph` – fetch nodes and edges for the selected app  

### Highlights

- Simulated network latency  
- Loading and error states  
- Cached responses per application  
- Automatic refetch on app change  

---

## 🧠 State Management (Zustand)

Zustand is used for non-server UI state:

- `selectedAppId`  
- `selectedNodeId`  
- `isMobilePanelOpen`  
- `activeInspectorTab`  

Server state (apps and graph data) is handled using TanStack Query.

---

## 🛠 Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/ShashikalaJ/Reactflow_app_graph.git
cd Reactflow_app_graph
