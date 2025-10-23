
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

from pydantic import ConfigDict

from langchain_core.messages.base import BaseMessage
from langchain_core.runnables.passthrough import RunnablePassthrough

from neuro_san.internals.journals.journal import Journal


class JournalingPassthrough(RunnablePassthrough, Journal):
    """
    RunnablePassthrough implementation that intercepts journal messages
    """

    # Declarations of member variables here satisfy Pydantic style,
    # which is a type validator that langchain is based on which
    # is able to use JSON schema definitions to validate fields.
    wrapped_journal: Journal

    origin: List[Dict[str, Any]]

    # This guy needs to be a pydantic class and in order to have
    # a non-pydantic Journal as a member, we need to do this.
    model_config = ConfigDict(arbitrary_types_allowed=True)

    async def write_message(self, message: BaseMessage, origin: List[Dict[str, Any]]):
        """
        Writes a BaseMessage entry into the journal
        :param message: The BaseMessage instance to write to the journal
        :param origin: A List of origin dictionaries indicating the origin of the run.
                The origin can be considered a path to the original call to the front-man.
                Origin dictionaries themselves each have the following keys:
                    "tool"                  The string name of the tool in the spec
                    "instantiation_index"   An integer indicating which incarnation
                                            of the tool is being dealt with.
        """
        # Forward on to the wrapped journal
        await self.wrapped_journal.write_message(message, origin)
