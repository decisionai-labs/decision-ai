
# Copyright (C) 2023-2025 Cognizant Digital Business, Evolutionary AI.
# All Rights Reserved.
# Issued under the Academic Public License.
#
# You can be released from the terms, and requirements of the Academic Public
# License by purchasing a commercial license.
# Purchase of a commercial license is mandatory for any use of the
# neuro-san SDK Software in commercial settings.
#
# END COPYRIGHT
from typing import Any
from typing import Dict
from typing import List

from unittest import TestCase

from neuro_san import REGISTRIES_DIR
from neuro_san.internals.graph.persistence.agent_network_restorer import AgentNetworkRestorer
from neuro_san.internals.graph.registry.agent_network import AgentNetwork
from neuro_san.internals.interfaces.agent_network_validator import AgentNetworkValidator
from neuro_san.internals.validation.tool_name_network_validator import ToolNameNetworkValidator


class AbstractNetworkValidatorTest(TestCase):
    """
    Unit tests for CyclesNetworkValidator class.
    """

    def create_validator(self) -> AgentNetworkValidator:
        """
        Creates an instance of the validator
        """
        # Can't actually be fully abstract, but when test infra picks up
        # this class it will be run, so give it something.
        # return NotImplementedError

        return ToolNameNetworkValidator()

    @staticmethod
    def restore(file_reference: str) -> Dict[str, Any]:
        # Open a known good network file
        restorer = AgentNetworkRestorer()
        hocon_file: str = REGISTRIES_DIR.get_file_in_basis(file_reference)
        agent_network: AgentNetwork = restorer.restore(file_reference=hocon_file)
        config: Dict[str, Any] = agent_network.get_config()
        return config

    def test_assumptions(self):
        """
        Can we construct?
        """
        validator: AgentNetworkValidator = self.create_validator()
        self.assertIsNotNone(validator)

    def test_empty(self):
        """
        Tests empty network
        """
        validator: AgentNetworkValidator = self.create_validator()

        errors: List[str] = validator.validate(None)
        self.assertEqual(1, len(errors))

        errors: List[str] = validator.validate({})
        self.assertEqual(1, len(errors))

    def test_valid(self):
        """
        Tests a valid network
        """
        validator: AgentNetworkValidator = self.create_validator()

        # Open a known good network file
        config: Dict[str, Any] = self.restore("hello_world.hocon")

        errors: List[str] = validator.validate(config)

        failure_message: str = None
        if len(errors) > 0:
            failure_message = errors[0]
        self.assertEqual(0, len(errors), failure_message)
