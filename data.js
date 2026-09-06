// Content + inline SVG markup for each Git/GitHub concept.
// Each entry's `svg` is scoped inside a <svg viewBox="0 0 320 180"> by script.js.

const CONCEPTS = [
  {
    id: "repo",
    title: "Repository (repo)",
    desc: "The project folder itself — tracked by Git, and often mirrored on a host like GitHub. It holds every file plus the complete history of how they got that way.",
    considerations: [
      "Usually one repo per project, living in a hidden .git folder.",
      "A local repo and its remote (e.g. GitHub) are separate copies kept in sync by push/pull.",
      "Never hand-edit or delete the .git folder — that's the whole history."
    ],
    resources: [
      { label: "Git Basics: Getting a Git Repository", url: "https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository" },
      { label: "GitHub Docs — About repositories", url: "https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories" },
      { label: "Git Handbook (GitHub Guides)", url: "https://guides.github.com/introduction/git-handbook/" }
    ],
    svg: `
      <rect id="repo-box" class="box-accent" x="105" y="55" width="110" height="80" rx="10"/>
      <text class="label" x="160" y="100" text-anchor="middle">.git</text>
      <text class="label" x="160" y="150" text-anchor="middle">repository</text>
      <g id="repo-files">
        <rect class="box" x="30" y="20" width="26" height="20" rx="3"/>
        <rect class="box" x="30" y="55" width="26" height="20" rx="3"/>
        <rect class="box" x="30" y="90" width="26" height="20" rx="3"/>
        <rect class="box" x="30" y="125" width="26" height="20" rx="3"/>
      </g>
    `
  },
  {
    id: "clone",
    title: "Clone",
    desc: "Cloning downloads a full copy of a repository — including its entire history — from a remote host down to your own machine.",
    considerations: [
      "You get complete history, not just the latest snapshot.",
      "Clone once with `git clone <url>`; use `git pull` afterward to stay current.",
      "Very large repos can be shallow-cloned with `--depth 1` to save time and space."
    ],
    resources: [
      { label: "git-clone — Git Documentation", url: "https://git-scm.com/docs/git-clone" },
      { label: "GitHub Docs — Cloning a repository", url: "https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository" },
      { label: "Atlassian — Cloning a repository", url: "https://www.atlassian.com/git/tutorials/setting-up-a-repository/git-clone" }
    ],
    svg: `
      <rect class="box-accent" x="20" y="60" width="90" height="60" rx="10"/>
      <text class="label" x="65" y="95" text-anchor="middle">remote</text>
      <rect id="clone-target" class="box" x="210" y="60" width="90" height="60" rx="10" opacity="0"/>
      <text class="label" x="255" y="95" text-anchor="middle">local</text>
      <path id="clone-arrow" class="edge-accent" d="M115 90 L205 90" marker-end="url(#arrow)"/>
      <circle id="clone-packet" class="node" cx="115" cy="90" r="6"/>
    `
  },
  {
    id: "branch",
    title: "Branch",
    desc: "A branch is a safe, parallel timeline of the codebase — a line of commits that diverges from another so you can experiment without touching it.",
    considerations: [
      "Keep branches short-lived and scoped to one change.",
      "Use descriptive names, e.g. feature/login-form or fix/null-check.",
      "Delete a branch after it's merged so the branch list stays clean."
    ],
    resources: [
      { label: "Git Branching — Basic Branching and Merging", url: "https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging" },
      { label: "Atlassian — Git branch tutorial", url: "https://www.atlassian.com/git/tutorials/using-branches" },
      { label: "GitHub flow guide", url: "https://docs.github.com/en/get-started/using-github/github-flow" }
    ],
    svg: `
      <path class="edge" d="M20 90 H300"/>
      <circle class="node" cx="40" cy="90" r="6"/>
      <circle class="node" cx="90" cy="90" r="6"/>
      <circle id="branch-point" class="node" cx="140" cy="90" r="6"/>
      <text class="label" x="140" y="115" text-anchor="middle">main</text>
      <g id="branch-line" opacity="0">
        <path class="edge-accent" d="M140 90 Q180 90 190 55 T240 40"/>
        <circle class="node-alt" cx="190" cy="55" r="6"/>
        <circle class="node-alt" cx="240" cy="40" r="6"/>
        <text class="label" x="245" y="25">feature/x</text>
      </g>
      <circle class="node" cx="230" cy="90" r="6" opacity="0" id="branch-mainkeep"/>
    `
  },
  {
    id: "commit",
    title: "Commit",
    desc: "A commit is a snapshot of your staged changes, saved to history with a message describing what changed and why.",
    considerations: [
      "Commit small, logical units of work rather than giant batches.",
      "Write messages that explain the reasoning, not just what files moved.",
      "Commits are cheap and local until pushed — commit often."
    ],
    resources: [
      { label: "git-commit — Git Documentation", url: "https://git-scm.com/docs/git-commit" },
      { label: "How to Write a Git Commit Message (cbeams)", url: "https://cbea.ms/git-commit/" },
      { label: "Conventional Commits", url: "https://www.conventionalcommits.org/" }
    ],
    svg: `
      <path class="edge" d="M20 100 H300"/>
      <circle class="node" cx="40" cy="100" r="6"/>
      <circle class="node" cx="90" cy="100" r="6"/>
      <g id="commit-files">
        <rect class="box" x="200" y="30" width="24" height="18" rx="3"/>
        <rect class="box" x="230" y="30" width="24" height="18" rx="3"/>
      </g>
      <circle id="commit-node" class="node" cx="140" cy="100" r="0"/>
      <text id="commit-label" class="label" x="140" y="130" text-anchor="middle" opacity="0">"fix: null check"</text>
    `
  },
  {
    id: "push-pull",
    title: "Push / Pull",
    desc: "Push uploads your local commits to the hosted repository; pull downloads and integrates commits from the host into your local repo.",
    considerations: [
      "Pull before you push to reduce the chance of conflicts.",
      "Only push branches you intend to share with others.",
      "Force-pushing rewrites remote history — coordinate with your team first."
    ],
    resources: [
      { label: "git-push — Git Documentation", url: "https://git-scm.com/docs/git-push" },
      { label: "git-pull — Git Documentation", url: "https://git-scm.com/docs/git-pull" },
      { label: "GitHub Docs — Syncing a fork", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork" }
    ],
    svg: `
      <rect class="box" x="30" y="30" width="90" height="50" rx="10"/>
      <text class="label" x="75" y="60" text-anchor="middle">local</text>
      <rect class="box" x="200" y="30" width="90" height="50" rx="10"/>
      <text class="label" x="245" y="60" text-anchor="middle">remote</text>
      <path class="edge-accent" d="M125 45 H195" marker-end="url(#arrow)"/>
      <text class="label" x="160" y="38" text-anchor="middle">push</text>
      <path class="edge-alt" d="M195 68 H125" marker-end="url(#arrow-alt)"/>
      <text class="label" x="160" y="88" text-anchor="middle">pull</text>
      <circle id="push-packet" class="node" cx="125" cy="45" r="5" opacity="0"/>
      <circle id="pull-packet" class="node-alt" cx="195" cy="68" r="5" opacity="0"/>
    `
  },
  {
    id: "diff",
    title: "Diff",
    desc: "A diff shows the line-by-line difference between two versions of a file or two branches — what was added and what was removed.",
    considerations: [
      "Always skim your diff before committing to catch stray debug code.",
      "Diffs compare lines, so a one-character edit can still show a whole line changed.",
      "`git diff --staged` shows exactly what the next commit will contain."
    ],
    resources: [
      { label: "git-diff — Git Documentation", url: "https://git-scm.com/docs/git-diff" },
      { label: "Atlassian — git diff tutorial", url: "https://www.atlassian.com/git/tutorials/saving-changes/git-diff" },
      { label: "GitHub Docs — Comparing branches", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-and-deleting-branches-within-your-repository" }
    ],
    svg: `
      <rect class="box" x="20" y="20" width="120" height="120" rx="8"/>
      <text class="label" x="80" y="35" text-anchor="middle">before</text>
      <rect class="box" x="180" y="20" width="120" height="120" rx="8"/>
      <text class="label" x="240" y="35" text-anchor="middle">after</text>
      <g id="diff-lines-before" class="label">
        <rect x="30" y="45" width="100" height="10" fill="none"/>
        <rect x="30" y="65" width="100" height="10" fill="none"/>
        <rect id="diff-removed" x="30" y="85" width="100" height="12" rx="2" fill="var(--red)" opacity="0"/>
      </g>
      <g id="diff-lines-after">
        <rect x="190" y="45" width="100" height="10" fill="none"/>
        <rect x="190" y="65" width="100" height="10" fill="none"/>
        <rect id="diff-added" x="190" y="85" width="100" height="12" rx="2" fill="var(--green)" opacity="0"/>
        <rect id="diff-added2" x="190" y="105" width="100" height="12" rx="2" fill="var(--green)" opacity="0"/>
      </g>
    `
  },
  {
    id: "merge",
    title: "Merge",
    desc: "Merging combines the history of one branch into another, bringing its commits — and changes — in as a merge commit.",
    considerations: [
      "A merge commit preserves the full shape of history, including the branch.",
      "If there's no divergence, Git performs a fast-forward instead of a merge commit.",
      "Test the result right after merging, before pushing it onward."
    ],
    resources: [
      { label: "Git Branching — Basic Merging", url: "https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging" },
      { label: "Atlassian — Merging vs. rebasing", url: "https://www.atlassian.com/git/tutorials/merging-vs-rebasing" },
      { label: "GitHub Docs — Merging a pull request", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/merging-a-pull-request" }
    ],
    svg: `
      <path class="edge" d="M20 90 H300"/>
      <circle class="node" cx="40" cy="90" r="6"/>
      <circle class="node" cx="90" cy="90" r="6"/>
      <path class="edge-accent" d="M90 90 Q130 90 140 55 T190 40"/>
      <circle class="node-alt" cx="140" cy="55" r="6"/>
      <circle class="node-alt" cx="190" cy="40" r="6"/>
      <text class="label" x="195" y="25">feature</text>
      <path id="merge-path" class="edge-accent" d="M190 40 Q230 40 240 65 T250 90" stroke-dasharray="120" stroke-dashoffset="120"/>
      <circle id="merge-node" class="node-merge" cx="250" cy="90" r="0"/>
      <text id="merge-label" class="label" x="250" y="115" text-anchor="middle" opacity="0">merge commit</text>
    `
  },
  {
    id: "rebase",
    title: "Rebase",
    desc: "Rebasing replays your branch's commits on top of the latest main, producing a clean, linear history as though you'd branched from there.",
    considerations: [
      "Never rebase commits that others have already pulled — it rewrites history.",
      "Great for tidying a feature branch before opening a pull request.",
      "Conflicts, if any, are resolved one replayed commit at a time."
    ],
    resources: [
      { label: "Git Branching — Rebasing", url: "https://git-scm.com/book/en/v2/Git-Branching-Rebasing" },
      { label: "Atlassian — Merging vs. rebasing", url: "https://www.atlassian.com/git/tutorials/merging-vs-rebasing/git-rebase" },
      { label: "The Git Rebase Introduction I Wish I'd Had", url: "https://womanonrails.com/git-rebase" }
    ],
    svg: `
      <path class="edge" d="M20 110 H300"/>
      <circle class="node" cx="40" cy="110" r="6"/>
      <circle class="node" cx="90" cy="110" r="6"/>
      <circle class="node" cx="140" cy="110" r="6"/>
      <text class="label" x="90" y="132" text-anchor="middle">main</text>
      <g id="rebase-branch">
        <path id="rebase-stem" class="edge-accent" d="M90 110 Q120 110 130 80 T180 60"/>
        <circle id="rb1" class="node-alt" cx="130" cy="80" r="6"/>
        <circle id="rb2" class="node-alt" cx="180" cy="60" r="6"/>
      </g>
      <text class="label" x="185" y="45">feature</text>
    `
  },
  {
    id: "conflict",
    title: "Merge Conflict",
    desc: "A merge conflict happens when two changes touch the exact same lines and Git can't automatically pick a winner — you decide.",
    considerations: [
      "Conflicts are a normal part of collaboration, not a mistake.",
      "Resolve by editing the `<<<<<<<` / `=======` / `>>>>>>>` markers, then commit.",
      "Pulling or rebasing often keeps conflicts small and manageable."
    ],
    resources: [
      { label: "GitHub Docs — Resolving a merge conflict", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line" },
      { label: "Git Tools — Basic Merge Conflicts", url: "https://git-scm.com/book/en/v2/Git-Tools-Advanced-Merging" },
      { label: "Atlassian — How to resolve merge conflicts", url: "https://www.atlassian.com/git/tutorials/using-branches/merge-conflicts" }
    ],
    svg: `
      <circle id="conflict-a" class="node-alt" cx="100" cy="90" r="9"/>
      <circle id="conflict-b" class="node" cx="220" cy="90" r="9"/>
      <text id="conflict-bang" class="label" x="160" y="70" text-anchor="middle" font-size="16" opacity="0">&#9888;</text>
      <rect id="conflict-box" class="box" x="115" y="105" width="90" height="40" rx="6" opacity="0"/>
      <text id="conflict-text" class="label" x="160" y="128" text-anchor="middle" opacity="0" font-size="8">choose a change</text>
      <circle id="conflict-resolved" class="node-merge" cx="160" cy="90" r="0"/>
    `
  },
  {
    id: "pr",
    title: "Pull Request (PR)",
    desc: "A pull request says \"please review and merge my branch\" — it's the collaborative review step before changes land in a shared branch.",
    considerations: [
      "Keep PRs small and focused so they're fast and easy to review.",
      "Write a clear description: what changed, and why.",
      "Open a draft PR for early feedback before it's ready to merge."
    ],
    resources: [
      { label: "GitHub Docs — About pull requests", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests" },
      { label: "GitHub Blog — How to write the perfect pull request", url: "https://github.blog/2015-01-21-how-to-write-the-perfect-pull-request/" },
      { label: "Google's Code Review Developer Guide", url: "https://google.github.io/eng-practices/review/" }
    ],
    svg: `
      <rect class="box-accent" x="20" y="70" width="80" height="40" rx="8"/>
      <text class="label" x="60" y="94" text-anchor="middle">branch</text>
      <rect class="box" x="220" y="70" width="80" height="40" rx="8"/>
      <text class="label" x="260" y="94" text-anchor="middle">main</text>
      <g id="pr-card" opacity="0">
        <rect class="box" x="120" y="20" width="80" height="34" rx="6"/>
        <text class="label" x="160" y="41" text-anchor="middle">review?</text>
      </g>
      <text id="pr-check" class="label" x="160" y="15" text-anchor="middle" font-size="14" opacity="0">&#10003;</text>
      <path id="pr-merge-arrow" class="edge-accent" d="M100 90 H215" marker-end="url(#arrow)" stroke-dasharray="115" stroke-dashoffset="115"/>
    `
  },
  {
    id: "issue",
    title: "Issue",
    desc: "An issue is a ticket — a bug report, feature request, or task — used to plan and discuss work before or alongside the code that addresses it.",
    considerations: [
      "Reference issues from commits/PRs (e.g. \"Closes #12\") to auto-close them on merge.",
      "Use labels and milestones to keep a growing backlog organized.",
      "Keep code review conversation in the PR; use the issue for the broader discussion."
    ],
    resources: [
      { label: "GitHub Docs — About issues", url: "https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues" },
      { label: "GitHub Docs — Linking a PR to an issue", url: "https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue" },
      { label: "GitHub Guides — Mastering issues", url: "https://guides.github.com/features/issues/" }
    ],
    svg: `
      <rect id="issue-card" class="box" x="90" y="35" width="140" height="70" rx="8"/>
      <text class="label" x="160" y="60" text-anchor="middle">#42 login bug</text>
      <g id="issue-labels" opacity="0">
        <rect x="102" y="72" width="34" height="14" rx="7" fill="var(--red)"/>
        <text class="label" x="119" y="82" text-anchor="middle" fill="#fff" font-size="7">bug</text>
        <rect x="142" y="72" width="44" height="14" rx="7" fill="var(--blue)"/>
        <text class="label" x="164" y="82" text-anchor="middle" fill="#fff" font-size="7">P1</text>
      </g>
      <text id="issue-closed" class="label" x="160" y="130" text-anchor="middle" opacity="0">&#10003; closed by commit</text>
    `
  }
];
