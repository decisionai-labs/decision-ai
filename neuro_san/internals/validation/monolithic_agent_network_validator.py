
# Copyright (C) 2023-2025 Cognizant Digital Business, Evolutionary AI.
# All Rights Reserved.
# Issued under the Academic Public License.
#
# You can be released from the terms, and requirements of the Academic Public
# License by purchasing a commercial license.
# Purchase of a commercial license is mandatory for any use of the
# neuro-san-studio SDK Software in commercial settings.
#
# END COPYRIGHT

import logging
from typing import Any

from coded_tools.agent_network_editor.get_mcp_tool import GetMcpTool
from coded_tools.agent_network_editor.get_subnetwork import GetSubnetwork
from coded_tools.agent_network_editor.get_toolbox import GetToolbox


class AgentNetworkValidator:
    """Validator for both structure and instructions of agent network definition."""

    def __init__(self, network: dict[str, dict[str, Any]]):
        self.logger = logging.getLogger(self.__class__.__name__)
        self.network = network

    def validate_toolbox_agents(self) -> list[str]:
        """
        Make sure that the toolbox agents have matching tools in toolbox.

        :return: List of error indicating any agents with no matching tools.
        """
        errors: list[str] = []

        self.logger.info("Validating toolbox agents...")

        # Get a dict of tools or error message if no toolbox found.
        tools: dict[str, Any] | str = GetToolbox().invoke(None, None)

        for agent_name, agent in self.network.items():
            if agent.get("instructions") is None:  # This is a toolbox agent
                if isinstance(tools, str):
                    errors.append(f"Toolbox is unavailable. Cannot create Toolbox agent '{agent_name}'.")
                if agent_name not in tools:
                    errors.append(f"Toolbox agent '{agent_name}' has no matching tool in toolbox.")

        return errors

    def validate_url(self) -> list[str]:
        """
        Check if URL of MCP servers and subnetworks are valid.

        :return: List of errors indicating invalid URL
        """
        errors: list[str] = []

        # Gather all URLs from MCP servers and subnetworks.
        subnetworks: dict[str, Any] | str = GetSubnetwork().invoke(None, None)
        if isinstance(subnetworks, dict):
            subnetworks: list = list(subnetworks.keys())
        else:
            subnetworks = []
        mcp_servers: list[str] = GetMcpTool().mcp_servers
        urls: list[str] = subnetworks + mcp_servers

        self.logger.info("Validating URLs for MCP tools and subnetwork...")

        for agent_name, agent in self.network.items():
            if agent.get("tools"):
                tools: list[str] = agent.get("tools")
                if tools:
                    for tool in tools:
                        if self._is_url_or_path(tool) and tool not in urls:
                            error_msg = f"Agent '{agent_name}' has invalid URL or path in tools: '{tool}'"
                            errors.append(error_msg)

        return errors

    def _is_url_or_path(self, tool: str) -> bool:
        """
        Check if a tool string is a URL or file path (not an agent name).

        :param tool: The tool string to check
        :return: True if tool is a URL or path, False otherwise
        """
        return (tool.startswith("/") or
                tool.startswith("http://") or
                tool.startswith("https://"))
