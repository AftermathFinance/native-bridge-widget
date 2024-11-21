export const bridgeAbi = [
  {
    type: "function",
    name: "UPGRADE_INTERFACE_VERSION",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "bridgeERC20",
    inputs: [
      {
        name: "tokenID",
        type: "uint8",
        internalType: "uint8",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "recipientAddress",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "destinationChainID",
        type: "uint8",
        internalType: "uint8",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "bridgeETH",
    inputs: [
      {
        name: "recipientAddress",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "destinationChainID",
        type: "uint8",
        internalType: "uint8",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "committee",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IBridgeCommittee",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "executeEmergencyOpWithSignatures",
    inputs: [
      {
        name: "signatures",
        type: "bytes[]",
        internalType: "bytes[]",
      },
      {
        name: "message",
        type: "tuple",
        internalType: "struct BridgeUtils.Message",
        components: [
          {
            name: "messageType",
            type: "uint8",
            internalType: "uint8",
          },
          {
            name: "version",
            type: "uint8",
            internalType: "uint8",
          },
          {
            name: "nonce",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "chainID",
            type: "uint8",
            internalType: "uint8",
          },
          {
            name: "payload",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      {
        name: "_committee",
        type: "address",
        internalType: "address",
      },
      {
        name: "_vault",
        type: "address",
        internalType: "address",
      },
      {
        name: "_limiter",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isTransferProcessed",
    inputs: [
      {
        name: "nonce",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    outputs: [
      {
        name: "isProcessed",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "limiter",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IBridgeLimiter",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "nonces",
    inputs: [
      {
        name: "messageType",
        type: "uint8",
        internalType: "uint8",
      },
    ],
    outputs: [
      {
        name: "nonce",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "paused",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "proxiableUUID",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferBridgedTokensWithSignatures",
    inputs: [
      {
        name: "signatures",
        type: "bytes[]",
        internalType: "bytes[]",
      },
      {
        name: "message",
        type: "tuple",
        internalType: "struct BridgeUtils.Message",
        components: [
          {
            name: "messageType",
            type: "uint8",
            internalType: "uint8",
          },
          {
            name: "version",
            type: "uint8",
            internalType: "uint8",
          },
          {
            name: "nonce",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "chainID",
            type: "uint8",
            internalType: "uint8",
          },
          {
            name: "payload",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "upgradeToAndCall",
    inputs: [
      {
        name: "newImplementation",
        type: "address",
        internalType: "address",
      },
      {
        name: "data",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "upgradeWithSignatures",
    inputs: [
      {
        name: "signatures",
        type: "bytes[]",
        internalType: "bytes[]",
      },
      {
        name: "message",
        type: "tuple",
        internalType: "struct BridgeUtils.Message",
        components: [
          {
            name: "messageType",
            type: "uint8",
            internalType: "uint8",
          },
          {
            name: "version",
            type: "uint8",
            internalType: "uint8",
          },
          {
            name: "nonce",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "chainID",
            type: "uint8",
            internalType: "uint8",
          },
          {
            name: "payload",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "vault",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IBridgeVault",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "ContractUpgraded",
    inputs: [
      {
        name: "nonce",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "proxy",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "implementation",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "EmergencyOperation",
    inputs: [
      {
        name: "nonce",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
      {
        name: "paused",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Initialized",
    inputs: [
      {
        name: "version",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Paused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TokensClaimed",
    inputs: [
      {
        name: "sourceChainID",
        type: "uint8",
        indexed: true,
        internalType: "uint8",
      },
      {
        name: "nonce",
        type: "uint64",
        indexed: true,
        internalType: "uint64",
      },
      {
        name: "destinationChainID",
        type: "uint8",
        indexed: true,
        internalType: "uint8",
      },
      {
        name: "tokenID",
        type: "uint8",
        indexed: false,
        internalType: "uint8",
      },
      {
        name: "erc20AdjustedAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "senderAddress",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
      {
        name: "recipientAddress",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TokensDeposited",
    inputs: [
      {
        name: "sourceChainID",
        type: "uint8",
        indexed: true,
        internalType: "uint8",
      },
      {
        name: "nonce",
        type: "uint64",
        indexed: true,
        internalType: "uint64",
      },
      {
        name: "destinationChainID",
        type: "uint8",
        indexed: true,
        internalType: "uint8",
      },
      {
        name: "tokenID",
        type: "uint8",
        indexed: false,
        internalType: "uint8",
      },
      {
        name: "suiAdjustedAmount",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
      {
        name: "senderAddress",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "recipientAddress",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Unpaused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Upgraded",
    inputs: [
      {
        name: "implementation",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AddressEmptyCode",
    inputs: [
      {
        name: "target",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "AddressInsufficientBalance",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "ERC1967InvalidImplementation",
    inputs: [
      {
        name: "implementation",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "ERC1967NonPayable",
    inputs: [],
  },
  {
    type: "error",
    name: "EnforcedPause",
    inputs: [],
  },
  {
    type: "error",
    name: "ExpectedPause",
    inputs: [],
  },
  {
    type: "error",
    name: "FailedInnerCall",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidInitialization",
    inputs: [],
  },
  {
    type: "error",
    name: "NotInitializing",
    inputs: [],
  },
  {
    type: "error",
    name: "ReentrancyGuardReentrantCall",
    inputs: [],
  },
  {
    type: "error",
    name: "SafeERC20FailedOperation",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "UUPSUnauthorizedCallContext",
    inputs: [],
  },
  {
    type: "error",
    name: "UUPSUnsupportedProxiableUUID",
    inputs: [
      {
        name: "slot",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
] as const;
