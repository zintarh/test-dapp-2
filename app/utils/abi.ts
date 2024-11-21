export const CounterABi = [
  {
    "name": "HelloStarknetImpl",
    "type": "impl",
    "interface_name": "counter::IHelloStarknet"
  },
  {
    "name": "counter::IHelloStarknet",
    "type": "interface",
    "items": [
      {
        "name": "increase_balance",
        "type": "function",
        "inputs": [
          {
            "name": "amount",
            "type": "core::felt252"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "get_balance",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::felt252"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "counter::HelloStarknet::Event",
    "type": "event",
    "variants": []
  }
]