This project is a modern web-based dashboard system designed for both staff members and supervisors. It’s built with plain HTML, CSS and JavaScript on the front-end so it’s lightweight, responsive and easy for a backend team to integrate with your APIs or databases.

👩‍💻 Staff Dashboard

The staff side gives each employee a simple, mobile-friendly interface to:

Log in and view their tasks or status.

Update their status (working, on break, lunch, shift ended, etc.).

Search/filter their tasks or time entries.

Switch between light and dark themes for comfort.

It’s intentionally limited — staff cannot export data or see other staff’s information beyond what’s relevant to them.

🧑‍💼 Supervisor Dashboard

Supervisors get a broader view of the whole team:

A table of all team members with avatars, names, current status, last update time and session duration.

Search and filter across staff.

A CSV export button to download current data for reporting.

Dark/light theme toggle for personal preference.

Supervisors can monitor productivity in real time and pass the exported data to other systems.

🏗️ Tech Stack

HTML/CSS/JS for the front-end.

Glassmorphism + red/white theme for a modern look.

No frameworks required — backend team can plug in any API (Node, Python, PHP, etc.).

Role-based UI so features like “Export CSV” only appear for supervisors.

💡 Purpose

The goal is to give an organisation:

A simple attendance & status tracking tool for staff.

A real-time monitoring and reporting tool for supervisors.

A clean, extendable front-end that your backend team can hook up to databases, authentication, and analytics.
