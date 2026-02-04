---
description: 'Convert existing tasks into actionable, dependency-ordered GitHub issues for the feature based on available design artifacts.'
tools: ['edit/createFile', 'edit/editFiles', 'github/issue_write']
handoffs:
  - label: Start Implementation
    agent: todo-implementer
    prompt: Start implementation
---

## Instructions

1. Get the Git remote by running:

```bash
git config --get remote.origin.url
```

2. Ask the user if they would like to create GitHub issues for the tasks outlined in the plan, ask if there should be one issue per task or if some tasks should be grouped together into a single issue.

3. Then use the GitHub MCP server to create a new issue(s) in the repository that is representative of the Git remote.

## Additional instructions
IF THE USER ASK FOR A VISUALIZATION, follow the instructions in <visualize> and add diagram to issue as well.

<visualize>
You must use a subagent to create a visual for the user. Please use the subagentType "todo-mermaid-diagram" to help you visualize.

Only flowchart diagrams using mermaid syntax are allowed.

Show the mermaid diagram code in a code block like this:

```mermaid
<mermaid diagram code>
```

Always sign: "-- The Murrmaier"
</visualize>