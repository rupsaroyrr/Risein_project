#![cfg(test)]
use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env};

#[test]
fn test_init_and_stats() {
    let env = Env::default();
    let contract_id = env.register(TranscendenceContract, ());
    let client = TranscendenceContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let token = Address::generate(&env);
    let goal = 10000000000i128;

    client.init(&admin, &token, &goal);

    let stats = client.get_stats();
    assert_eq!(stats.admin, admin);
    assert_eq!(stats.token, token);
    assert_eq!(stats.goal, goal);
    assert_eq!(stats.total, 0);
    assert_eq!(stats.is_active, true);
}
