
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

from typing import Any
from typing import Dict
from typing import List

import logging

from neuro_san.internals.interfaces.agent_network_validator import AgentNetworkValidator


class KeywordNetworkValidator(AgentNetworkValidator):
    """
    AgentNetworkValidator that looks for correct keywords in an agent network
    """

    def __init__(self):
        """
        Constructor
        """
        self.logger = logging.getLogger(self.__class__.__name__)

    def validate(self, agent_network: Dict[str, Any]) -> List[str]:
        """
        Validation the agent network.

        :return: List of errors indicating agents and missing keywords
        """
        errors: List[str] = []

        self.logger.info("Validating agent network keywords...")

        # Currently, only required "instructions" for non-function agents.
        for agent_name, agent in agent_network.items():
            if agent.get("instructions") == "":
                error_msg = f"{agent_name} 'instructions' cannot be empty."
                errors.append(error_msg)

        self.logger.warning(str(errors))

        return errors
