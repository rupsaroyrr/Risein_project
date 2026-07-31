#![cfg(test)]
use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env};

#[test]
fn test_shop_init() {
    let env = Env::default();
    let contract_id = env.register(NFTShop, ());
    let client = NFTShopClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let nft_contract = Address::generate(&env);
    let xlm_token = Address::generate(&env);

    client.init(&admin, &nft_contract, &xlm_token, &6u32);
}
