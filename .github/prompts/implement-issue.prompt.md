---
agent: todo-implementer
---

# GitHub Issue Implementation

## Workflow

1. **Issue Selection**
   - If the user provides a GitHub issue number, fetch the issue details using the GitHub MCP server. This could be an integer representing the issue number, or a string in the format `#<issue-number>`.
   - If no issue number is provided, use Github MCP server to list open issues from the repository and prompt the user to select one.
