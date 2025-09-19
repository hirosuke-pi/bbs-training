import type { Meta, StoryObj } from "@storybook/react-vite";
import { MermaidViewer } from "./index";

const flowchart = `flowchart TD
  A[Start] --> B{Condition?}
  B -->|Yes| C[Action 1]
  B -->|No| D[Action 2]
  C --> E[Merge]
  D --> E[Merge]
  E --> F[End]`;

const sequence = `sequenceDiagram
  participant U as User
  participant B as Browser
  participant API as Backend
  U->>B: Open page
  B->>API: GET /api/thread/all
  API-->>B: 200 JSON(ThreadList)
  B-->>U: Render Threads
  U->>B: Create Thread
  B->>API: POST /api/thread
  API-->>B: 201 Created
  B-->>U: Update View`;

const classDiagram = `classDiagram
  class Thread {
    +String id
    +String title
    +Int totalPosts
    +Date createdAt
  }
  class Post {
    +String id
    +String threadId
    +String content
    +Date createdAt
  }
  Thread --> Post : contains`;

const stateDiagram = `stateDiagram-v2
  [*] --> Viewing
  Viewing --> Creating: click create
  Creating --> Viewing: success
  Viewing --> Viewing: refresh
  Creating --> Error: validation fail
  Error --> Creating: fix & retry`;

const erDiagram = `erDiagram
  THREAD ||--o{ POST : has
  THREAD {
    string id
    string title
    int totalPosts
  }
  POST {
    string id
    string threadId
    string content
  }`;

const invalid = `flowchart XX\n This is not valid`;

const meta: Meta<typeof MermaidViewer> = {
  title: "Components/MermaidViewer",
  component: MermaidViewer,
  args: {
    code: flowchart,
  },
};
export default meta;

type Story = StoryObj<typeof MermaidViewer>;

export const Default: Story = {};

export const SequenceDiagram: Story = {
  args: { code: sequence },
};

export const ClassDiagram: Story = {
  args: { code: classDiagram },
};

export const StateDiagram: Story = {
  args: { code: stateDiagram },
};

export const ERDiagram: Story = {
  args: { code: erDiagram },
};

export const InvalidSyntax: Story = {
  args: { code: invalid },
};
