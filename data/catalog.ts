import { CollectionItem, discoveries as baseDiscoveries } from './mock';

const etb=(id:string,name:string,setName:string):CollectionItem=>({id:`etb-${id}-en`,name,subtitle:`${setName} · Englisch · Elite Trainer Box`,kind:'Sealed',quantity:1,buyPrice:0,marketPrice:0,productType:'Top-Trainer-Box',setName,language:'EN'});
const pcEtb=(id:string,name:string,setName:string):CollectionItem=>({id:`pc-etb-${id}-en`,name,subtitle:`${setName} · Englisch · Pokémon Center Elite Trainer Box`,kind:'Sealed',quantity:1,buyPrice:0,marketPrice:0,productType:'Top-Trainer-Box',setName,language:'EN'});

// Standard English ETBs are deliberately separate products from Pokémon Center ETBs.
// Variant boxes (different cover Pokémon) also get their own catalog entry.
export const englishStandardEtbs: CollectionItem[] = [
  etb('chilling-reign-shadow','Chilling Reign Elite Trainer Box (Shadow Rider Calyrex)','Chilling Reign'),
  etb('chilling-reign-ice','Chilling Reign Elite Trainer Box (Ice Rider Calyrex)','Chilling Reign'),
  etb('evolving-skies-jolteon','Evolving Skies Elite Trainer Box (Jolteon, Flareon, Umbreon & Leafeon)','Evolving Skies'),
  etb('evolving-skies-vaporeon','Evolving Skies Elite Trainer Box (Vaporeon, Espeon, Glaceon & Sylveon)','Evolving Skies'),
  etb('celebrations','Celebrations Elite Trainer Box','Celebrations'),
  etb('fusion-strike','Fusion Strike Elite Trainer Box','Fusion Strike'),
  etb('brilliant-stars','Brilliant Stars Elite Trainer Box','Brilliant Stars'),
  etb('astral-radiance','Astral Radiance Elite Trainer Box','Astral Radiance'),
  etb('pokemon-go','Pokémon GO Elite Trainer Box','Pokémon GO'),
  etb('lost-origin','Lost Origin Elite Trainer Box','Lost Origin'),
  etb('silver-tempest','Silver Tempest Elite Trainer Box','Silver Tempest'),
  etb('crown-zenith','Crown Zenith Elite Trainer Box','Crown Zenith'),
  etb('sv-koraidon','Scarlet & Violet Elite Trainer Box (Koraidon)','Scarlet & Violet'),
  etb('sv-miraidon','Scarlet & Violet Elite Trainer Box (Miraidon)','Scarlet & Violet'),
  etb('paldea-evolved','Paldea Evolved Elite Trainer Box','Paldea Evolved'),
  etb('obsidian-flames','Obsidian Flames Elite Trainer Box','Obsidian Flames'),
  etb('151','Scarlet & Violet—151 Elite Trainer Box','151'),
  etb('paradox-rift-roaring-moon','Paradox Rift Elite Trainer Box (Roaring Moon)','Paradox Rift'),
  etb('paradox-rift-iron-valiant','Paradox Rift Elite Trainer Box (Iron Valiant)','Paradox Rift'),
  etb('paldean-fates','Paldean Fates Elite Trainer Box','Paldean Fates'),
  etb('temporal-forces-walking-wake','Temporal Forces Elite Trainer Box (Walking Wake)','Temporal Forces'),
  etb('temporal-forces-iron-leaves','Temporal Forces Elite Trainer Box (Iron Leaves)','Temporal Forces'),
  etb('twilight-masquerade','Twilight Masquerade Elite Trainer Box','Twilight Masquerade'),
  etb('shrouded-fable','Shrouded Fable Elite Trainer Box','Shrouded Fable'),
  etb('stellar-crown','Stellar Crown Elite Trainer Box','Stellar Crown'),
  etb('surging-sparks','Surging Sparks Elite Trainer Box','Surging Sparks'),
  etb('prismatic-evolutions','Prismatic Evolutions Elite Trainer Box','Prismatic Evolutions'),
  etb('journey-together','Journey Together Elite Trainer Box','Journey Together'),
  etb('destined-rivals','Destined Rivals Elite Trainer Box','Destined Rivals'),
  etb('black-bolt','Black Bolt Elite Trainer Box','Black Bolt'),
  etb('white-flare','White Flare Elite Trainer Box','White Flare'),
  etb('mega-evolution-lucario','Mega Evolution Elite Trainer Box (Mega Lucario)','Mega Evolution'),
  etb('mega-evolution-gardevoir','Mega Evolution Elite Trainer Box (Mega Gardevoir)','Mega Evolution'),
  etb('phantasmal-flames','Mega Evolution—Phantasmal Flames Elite Trainer Box','Phantasmal Flames'),
  etb('ascended-heroes','Mega Evolution—Ascended Heroes Elite Trainer Box','Ascended Heroes'),
  etb('perfect-order','Mega Evolution—Perfect Order Elite Trainer Box','Perfect Order'),
  etb('chaos-rising','Mega Evolution—Chaos Rising Elite Trainer Box','Chaos Rising'),
  etb('pitch-black','Mega Evolution—Pitch Black Elite Trainer Box','Pitch Black'),
  etb('30th-celebration','30th Celebration Elite Trainer Box','30th Celebration'),
];

// 30th Celebration was announced after the original Pokémon Center list in mock.ts.
export const additionalPokemonCenterEtbs: CollectionItem[] = [
  pcEtb('30th-celebration','30th Celebration Pokémon Center Elite Trainer Box','30th Celebration'),
];

export const discoveries: CollectionItem[] = Array.from(
  new Map([...baseDiscoveries, ...englishStandardEtbs, ...additionalPokemonCenterEtbs].map(item => [item.id,item])).values()
);
