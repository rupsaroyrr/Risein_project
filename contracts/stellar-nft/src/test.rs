#![cfg(test)]
use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env, String};

#[test]
fn test_nft_mint_and_transfer() {
    let env = Env::default();
    let contract_id = env.register(StellarNFT, ());
    let client = StellarNFTClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let user = Address::generate(&env);
    let recipient = Address::generate(&env);

    client.init(&admin);

    env.mock_all_auths();

    let nft_id = 1u32;
    let meta = String::from_str(&env, "ipfs://QmTest123");
    client.mint(&user, &nft_id, &meta);

    assert_eq!(client.owner_of(&nft_id), user);
    assert_eq!(client.get_metadata(&nft_id), meta);

    client.transfer(&user, &recipient, &nft_id);
    assert_eq!(client.owner_of(&nft_id), recipient);
}
