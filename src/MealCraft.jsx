import { useState, useRef, useEffect, useCallback } from "react";

// ─── COLOUR TOKENS ──────────────────────────────────────────
// bg=#0a0a08  surface=#121210  card=#1a1a16  gold=#c9a84c

// ─── 50+ INGREDIENTS ────────────────────────────────────────
const INGREDIENTS = [
  // Vegetables
  { id:"broccoli",    name:"Broccoli",      emoji:"🥦", category:"Vegetable" },
  { id:"carrot",      name:"Carrot",        emoji:"🥕", category:"Vegetable" },
  { id:"spinach",     name:"Spinach",       emoji:"🌿", category:"Vegetable" },
  { id:"potato",      name:"Potato",        emoji:"🥔", category:"Vegetable" },
  { id:"bellpepper",  name:"Bell Pepper",   emoji:"🫑", category:"Vegetable" },
  { id:"mushroom",    name:"Mushroom",      emoji:"🍄", category:"Vegetable" },
  { id:"corn",        name:"Corn",          emoji:"🌽", category:"Vegetable" },
  { id:"onion",       name:"Onion",         emoji:"🧅", category:"Vegetable" },
  { id:"eggplant",    name:"Eggplant",      emoji:"🍆", category:"Vegetable" },
  { id:"tomato",      name:"Tomato",        emoji:"🍅", category:"Vegetable" },
  { id:"cauliflower", name:"Cauliflower",   emoji:"🤍", category:"Vegetable" },
  { id:"peas",        name:"Green Peas",    emoji:"🫛", category:"Vegetable" },
  { id:"cucumber",    name:"Cucumber",      emoji:"🥒", category:"Vegetable" },
  { id:"garlic",      name:"Garlic",        emoji:"🧄", category:"Vegetable" },
  { id:"ginger",      name:"Ginger",        emoji:"🫚", category:"Vegetable" },
  { id:"sweetpotato", name:"Sweet Potato",  emoji:"🍠", category:"Vegetable" },
  { id:"radish",      name:"Radish",        emoji:"🌸", category:"Vegetable" },
  { id:"beetroot",    name:"Beetroot",      emoji:"🟣", category:"Vegetable" },
  { id:"lettuce",     name:"Lettuce",       emoji:"🥬", category:"Vegetable" },
  { id:"zucchini",    name:"Zucchini",      emoji:"🫒", category:"Vegetable" },
  // Fruits
  { id:"mango",       name:"Mango",         emoji:"🥭", category:"Fruit" },
  { id:"banana",      name:"Banana",        emoji:"🍌", category:"Fruit" },
  { id:"apple",       name:"Apple",         emoji:"🍎", category:"Fruit" },
  { id:"lemon",       name:"Lemon",         emoji:"🍋", category:"Fruit" },
  { id:"coconut",     name:"Coconut",       emoji:"🥥", category:"Fruit" },
  { id:"pineapple",   name:"Pineapple",     emoji:"🍍", category:"Fruit" },
  { id:"pomegranate", name:"Pomegranate",   emoji:"🍒", category:"Fruit" },
  { id:"papaya",      name:"Papaya",        emoji:"🍈", category:"Fruit" },
  { id:"guava",       name:"Guava",         emoji:"🍐", category:"Fruit" },
  { id:"orange",      name:"Orange",        emoji:"🍊", category:"Fruit" },
  { id:"grapes",      name:"Grapes",        emoji:"🍇", category:"Fruit" },
  { id:"strawberry",  name:"Strawberry",    emoji:"🍓", category:"Fruit" },
  { id:"watermelon",  name:"Watermelon",    emoji:"🍉", category:"Fruit" },
  { id:"avocado",     name:"Avocado",       emoji:"🥑", category:"Fruit" },
  { id:"kiwi",        name:"Kiwi",          emoji:"🥝", category:"Fruit" },
  // Dry Fruits
  { id:"almond",      name:"Almond",        emoji:"🌰", category:"Dry Fruit" },
  { id:"cashew",      name:"Cashew",        emoji:"🥜", category:"Dry Fruit" },
  { id:"walnut",      name:"Walnut",        emoji:"🌰", category:"Dry Fruit" },
  { id:"raisin",      name:"Raisins",       emoji:"🫐", category:"Dry Fruit" },
  { id:"pistachio",   name:"Pistachio",     emoji:"🟢", category:"Dry Fruit" },
  { id:"dates",       name:"Dates",         emoji:"🟤", category:"Dry Fruit" },
  { id:"fig",         name:"Dried Figs",    emoji:"🫐", category:"Dry Fruit" },
  { id:"apricot",     name:"Dried Apricot", emoji:"🟠", category:"Dry Fruit" },
  { id:"peanut",      name:"Peanut",        emoji:"🥜", category:"Dry Fruit" },
  { id:"chestnut",    name:"Chestnut",      emoji:"🌰", category:"Dry Fruit" },
];

const RECIPES = [
  { id:1, title:"Aloo Gobi", cuisine:"Indian", diet:["Vegetarian","Vegan","Jain"], difficulty:"Easy", time:30, calories:180, protein:5, carbs:28, fat:6, ingredients:["potato","cauliflower","tomato","onion","garlic","ginger"], image:"https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80", description:"A classic North Indian dry curry bursting with turmeric and cumin.", steps:["Heat oil, add cumin seeds.","Sauté onions till golden.","Add ginger-garlic paste.","Add tomatoes and spices.","Add potatoes and cauliflower.","Cook covered for 20 mins."] },
  { id:2, title:"Palak Paneer", cuisine:"Indian", diet:["Vegetarian"], difficulty:"Easy", time:35, calories:280, protein:14, carbs:12, fat:18, ingredients:["spinach","tomato","onion","garlic","ginger"], image:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80", description:"Creamy spinach gravy with soft paneer cubes — a restaurant classic.", steps:["Blanch and blend spinach.","Sauté onion-tomato masala.","Add blended spinach.","Simmer with cream.","Add paneer cubes.","Garnish with cream swirl."] },
  { id:3, title:"Mushroom Risotto", cuisine:"Italian", diet:["Vegetarian"], difficulty:"Easy", time:40, calories:320, protein:10, carbs:48, fat:10, ingredients:["mushroom","onion","garlic"], image:"https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80", description:"Velvety arborio rice with umami-rich mushrooms and parmesan.", steps:["Sauté mushrooms in butter.","Toast arborio rice.","Add warm broth ladle by ladle.","Stir continuously 18 mins.","Finish with parmesan and butter.","Rest 2 mins before serving."] },
  { id:4, title:"Mango Lassi", cuisine:"Indian", diet:["Vegetarian"], difficulty:"Easy", time:5, calories:220, protein:6, carbs:38, fat:5, ingredients:["mango"], image:"https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&q=80", description:"Chilled, sweet and tangy Alphonso mango blended with thick yoghurt.", steps:["Blend ripe mango pulp.","Add chilled yoghurt.","Add sugar and cardamom.","Blend until smooth.","Pour over ice.","Garnish with saffron strands."] },
  { id:5, title:"Banana Oat Pancakes", cuisine:"Continental", diet:["Vegetarian","Vegan"], difficulty:"Easy", time:20, calories:240, protein:7, carbs:42, fat:5, ingredients:["banana"], image:"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80", description:"Fluffy, naturally sweet pancakes with no refined sugar.", steps:["Mash ripe bananas.","Mix with oats and egg.","Add cinnamon and vanilla.","Cook on non-stick pan.","Flip when bubbles form.","Serve with maple syrup."] },
  { id:6, title:"Broccoli Cheddar Soup", cuisine:"Continental", diet:["Vegetarian"], difficulty:"Easy", time:30, calories:260, protein:12, carbs:20, fat:14, ingredients:["broccoli","onion","garlic"], image:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80", description:"Thick, comforting soup with tender broccoli and sharp cheddar.", steps:["Sauté onions and garlic.","Add broccoli and broth.","Simmer 15 mins.","Blend half the soup.","Stir in cheddar cheese.","Season and serve hot."] },
  { id:7, title:"Carrot Halwa", cuisine:"Indian", diet:["Vegetarian"], difficulty:"Easy", time:45, calories:310, protein:6, carbs:45, fat:12, ingredients:["carrot","almond","cashew","raisin"], image:"https://images.unsplash.com/photo-1605709303005-0bababcb4db5?w=600&q=80", description:"Slow-cooked grated carrots in ghee, milk and sugar — pure nostalgia.", steps:["Grate fresh carrots.","Cook in ghee till fragrant.","Add full-fat milk.","Simmer till milk absorbs.","Add sugar and cardamom.","Garnish with nuts and serve."] },
  { id:8, title:"Stuffed Bell Peppers", cuisine:"Mediterranean", diet:["Vegetarian","Vegan"], difficulty:"Easy", time:40, calories:200, protein:8, carbs:30, fat:6, ingredients:["bellpepper","corn","onion","tomato"], image:"https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=600&q=80", description:"Colourful peppers stuffed with spiced quinoa, corn and black beans.", steps:["Halve and deseed peppers.","Cook quinoa with spices.","Mix with corn and beans.","Fill peppers generously.","Top with cheese.","Bake 400°F for 25 mins."] },
  { id:9, title:"Elote Street Corn", cuisine:"Mexican", diet:["Vegetarian"], difficulty:"Easy", time:15, calories:190, protein:5, carbs:28, fat:8, ingredients:["corn"], image:"https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80", description:"Charred corn slathered with spiced mayo, cotija and lime — street food gold.", steps:["Grill corn till charred.","Mix mayo, sour cream, cotija.","Add chili powder and lime.","Brush sauce over corn.","Sprinkle extra cheese.","Garnish with cilantro."] },
  { id:10, title:"Baingan Bharta", cuisine:"Indian", diet:["Vegetarian","Vegan"], difficulty:"Easy", time:35, calories:150, protein:4, carbs:18, fat:7, ingredients:["eggplant","tomato","onion","garlic","ginger"], image:"https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80", description:"Smoky fire-roasted eggplant mashed with spices — a Punjabi gem.", steps:["Roast eggplant over flame.","Peel and mash the flesh.","Sauté onions, tomatoes, spices.","Add mashed eggplant.","Cook 10 mins.","Garnish with fresh coriander."] },
  { id:11, title:"Avocado Toast", cuisine:"Continental", diet:["Vegetarian","Vegan"], difficulty:"Easy", time:10, calories:280, protein:7, carbs:28, fat:16, ingredients:["avocado","lemon","tomato"], image:"https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=600&q=80", description:"Smashed creamy avocado on toasted sourdough with chilli flakes.", steps:["Toast thick sourdough slices.","Mash avocado with lemon.","Season with salt and pepper.","Spread generously on toast.","Top with cherry tomatoes.","Finish with chilli flakes."] },
  { id:12, title:"Almond Kheer", cuisine:"Indian", diet:["Vegetarian"], difficulty:"Easy", time:30, calories:340, protein:9, carbs:38, fat:16, ingredients:["almond","cashew","raisin","dates"], image:"https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80", description:"Rich milk pudding with ground almonds, saffron and dry fruits.", steps:["Soak and grind almonds.","Boil full-fat milk.","Add almond paste.","Simmer till thick.","Add sugar, saffron, cardamom.","Garnish with pistachios."] },
  { id:13, title:"Coconut Curry", cuisine:"Asian", diet:["Vegetarian","Vegan"], difficulty:"Easy", time:30, calories:290, protein:6, carbs:22, fat:20, ingredients:["coconut","mushroom","bellpepper","spinach"], image:"https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&q=80", description:"Fragrant Thai-inspired coconut milk curry with seasonal vegetables.", steps:["Sauté lemongrass and galangal.","Add red curry paste.","Pour in coconut milk.","Add vegetables.","Simmer 15 mins.","Serve over jasmine rice."] },
  { id:14, title:"Strawberry Smoothie Bowl", cuisine:"Continental", diet:["Vegetarian","Vegan"], difficulty:"Easy", time:10, calories:200, protein:5, carbs:40, fat:3, ingredients:["strawberry","banana","almond"], image:"https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&q=80", description:"Thick frozen berry base topped with granola, seeds and fresh fruit.", steps:["Blend frozen strawberries.","Add banana for creaminess.","Pour into bowl.","Top with granola.","Add fresh berries.","Drizzle with honey."] },
  { id:15, title:"Pineapple Fried Rice", cuisine:"Asian", diet:["Vegetarian","Vegan"], difficulty:"Easy", time:25, calories:310, protein:8, carbs:52, fat:8, ingredients:["pineapple","corn","bellpepper","onion"], image:"https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80", description:"Sweet and savoury Thai fried rice served inside a pineapple bowl.", steps:["Cook jasmine rice a day ahead.","Wok-fry onions and garlic.","Add vegetables and rice.","Season with soy sauce.","Fold in pineapple chunks.","Serve in pineapple shell."] },
  { id:16, title:"Walnut Brownie", cuisine:"Continental", diet:["Vegetarian"], difficulty:"Easy", time:40, calories:380, protein:6, carbs:44, fat:20, ingredients:["walnut","almond"], image:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80", description:"Dense, fudgy chocolate brownies studded with toasted walnuts.", steps:["Melt chocolate and butter.","Whisk eggs and sugar.","Fold in flour and cocoa.","Add walnut pieces.","Pour into tin.","Bake 350°F for 25 mins."] },
  { id:17, title:"Beetroot Tikki", cuisine:"Indian", diet:["Vegetarian","Vegan"], difficulty:"Easy", time:30, calories:160, protein:4, carbs:24, fat:5, ingredients:["beetroot","potato","onion"], image:"https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&q=80", description:"Crispy pan-fried patties of beetroot and potato with tangy chutney.", steps:["Grate beetroot and boil potato.","Mix with spices and breadcrumbs.","Shape into round patties.","Shallow fry till crispy.","Drain on paper towel.","Serve with mint chutney."] },
  { id:18, title:"Kiwi Mint Mojito", cuisine:"Continental", diet:["Vegetarian","Vegan"], difficulty:"Easy", time:5, calories:90, protein:1, carbs:22, fat:0, ingredients:["kiwi","lemon"], image:"https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80", description:"Bright green kiwi and mint mocktail — refreshing and beautiful.", steps:["Muddle kiwi slices.","Add fresh mint leaves.","Squeeze fresh lime.","Add sugar syrup.","Top with sparkling water.","Garnish with mint sprig."] },
  { id:19, title:"Date & Nut Energy Balls", cuisine:"Continental", diet:["Vegetarian","Vegan"], difficulty:"Easy", time:15, calories:120, protein:3, carbs:18, fat:5, ingredients:["dates","almond","cashew","walnut","pistachio"], image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", description:"No-bake power bites packed with natural sugar and healthy fats.", steps:["Pit and soak dates 10 mins.","Blend dates till paste forms.","Mix in chopped nuts.","Add cocoa and coconut flakes.","Roll into balls.","Chill 30 mins before serving."] },
  { id:20, title:"Watermelon Feta Salad", cuisine:"Mediterranean", diet:["Vegetarian"], difficulty:"Easy", time:10, calories:140, protein:5, carbs:20, fat:5, ingredients:["watermelon","lemon"], image:"https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&q=80", description:"Juicy watermelon with salty feta, mint and a lime drizzle.", steps:["Cube seedless watermelon.","Crumble fresh feta over.","Tear fresh mint leaves.","Drizzle olive oil.","Squeeze lime juice.","Season with black pepper."] },
];

const byCategory = (cat) => INGREDIENTS.filter(i => i.category === cat);
const cuisines = ["All", ...new Set(RECIPES.map(r => r.cuisine))];
const diets = ["All","Vegetarian","Vegan","Jain"];

// ─── CSS ────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0a0a08;--sur:#121210;--card:#1a1a16;--bor:#2a2a22;--gold:#c9a84c;--gdim:#8a6f2e;--gglow:rgba(201,168,76,0.14);--txt:#f0ead8;--mut:#7a7468;--grn:#4a7c59}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--txt);font-family:'DM Sans',sans-serif;min-height:100vh}
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--gdim);border-radius:2px}
.root{display:flex;flex-direction:column;min-height:100vh}
/* NAV */
.nav{position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;height:60px;background:rgba(10,10,8,0.95);backdrop-filter:blur(20px);border-bottom:1px solid var(--bor)}
.logo{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:700;color:var(--gold);letter-spacing:.04em;line-height:1}
.logo em{font-style:italic;font-weight:300}
.tagline{font-size:.6rem;color:var(--mut);letter-spacing:.2em;text-transform:uppercase;margin-top:2px}
.nav-links{display:flex;gap:1.75rem}
.nl{background:none;border:none;color:var(--mut);font-family:'DM Sans',sans-serif;font-size:.82rem;cursor:pointer;padding:4px 0;letter-spacing:.04em;transition:color .2s;position:relative}
.nl:hover,.nl.on{color:var(--gold)}
.nl.on::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:1px;background:var(--gold)}
/* LAYOUT */
.body{display:flex;flex:1}
.sidebar{width:240px;min-width:240px;background:var(--sur);border-right:1px solid var(--bor);padding:1.25rem 0;overflow-y:auto;max-height:calc(100vh - 60px);position:sticky;top:60px}
.sc{font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:var(--mut);padding:.7rem 1.25rem .4rem}
.ii{display:flex;align-items:center;gap:.65rem;padding:.5rem 1.25rem;cursor:grab;transition:background .15s;border-left:2px solid transparent;font-size:.84rem;color:var(--txt);user-select:none}
.ii:hover{background:var(--gglow);border-left-color:var(--gdim)}
.ii.sel{background:rgba(201,168,76,.1);border-left-color:var(--gold);color:var(--gold)}
.ie{font-size:1.15rem}
/* MAIN */
.main{flex:1;padding:1.75rem 2rem;overflow-y:auto}
/* FRIDGE */
.fridge{background:var(--card);border:1px dashed var(--bor);border-radius:14px;padding:.9rem 1.25rem;margin-bottom:1.75rem;transition:border-color .2s,background .2s}
.fridge.over{border-color:var(--gold);background:rgba(201,168,76,.04)}
.fl{font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:var(--mut);margin-bottom:.6rem}
.fi{display:flex;flex-wrap:wrap;gap:.4rem;min-height:32px;align-items:center}
.chip{display:flex;align-items:center;gap:.35rem;background:rgba(201,168,76,.1);border:1px solid var(--gdim);border-radius:99px;padding:3px 10px 3px 7px;font-size:.77rem;color:var(--gold);animation:chipIn .2s ease}
.chip button{background:none;border:none;color:var(--gdim);cursor:pointer;font-size:.85rem;line-height:1;padding:0 0 0 3px}
.chip button:hover{color:var(--gold)}
.hint{color:var(--mut);font-size:.8rem;font-style:italic}
.fridge-acts{display:flex;gap:.6rem;margin-top:.7rem}
.btn-g{background:linear-gradient(135deg,var(--gold),var(--gdim));border:none;color:#0a0a08;font-family:'DM Sans',sans-serif;font-weight:500;font-size:.8rem;padding:7px 18px;border-radius:99px;cursor:pointer;letter-spacing:.04em;transition:opacity .2s}
.btn-g:hover{opacity:.82}
.btn-gh{background:none;border:1px solid var(--bor);color:var(--mut);font-family:'DM Sans',sans-serif;font-size:.8rem;padding:7px 14px;border-radius:99px;cursor:pointer;transition:border-color .2s,color .2s}
.btn-gh:hover{border-color:var(--gold);color:var(--gold)}
/* SEARCH */
.srow{display:flex;gap:.75rem;margin-bottom:1.25rem;align-items:center;flex-wrap:wrap}
.sw{position:relative;flex:1;min-width:180px}
.si{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--mut);font-size:.95rem}
.search{width:100%;background:var(--card);border:1px solid var(--bor);border-radius:99px;padding:9px 16px 9px 40px;color:var(--txt);font-family:'DM Sans',sans-serif;font-size:.84rem;outline:none;transition:border-color .2s}
.search:focus{border-color:var(--gdim)}
.search::placeholder{color:var(--mut)}
.fsel{background:var(--card);border:1px solid var(--bor);border-radius:99px;padding:9px 14px;color:var(--txt);font-family:'DM Sans',sans-serif;font-size:.8rem;outline:none;cursor:pointer}
/* SEC HDR */
.sh{display:flex;align-items:baseline;gap:.75rem;margin-bottom:1.1rem}
.st{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:600;color:var(--txt)}
.sc2{font-size:.75rem;color:var(--mut)}
/* NETFLIX ROW */
.nrow{margin-bottom:2.25rem}
.nrt{font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-weight:600;color:var(--txt);margin-bottom:.85rem;display:flex;align-items:center;gap:.5rem}
.nrt::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,var(--bor),transparent);margin-left:.5rem}
.nscroll{display:flex;gap:.85rem;overflow-x:auto;padding-bottom:.6rem;scroll-snap-type:x mandatory}
.nscroll::-webkit-scrollbar{height:3px}
/* CARD */
.card{min-width:200px;max-width:200px;background:var(--card);border:1px solid var(--bor);border-radius:11px;overflow:hidden;cursor:pointer;scroll-snap-align:start;transition:transform .25s,border-color .25s,box-shadow .25s;flex-shrink:0}
.card:hover{transform:translateY(-4px) scale(1.025);border-color:var(--gdim);box-shadow:0 10px 36px rgba(201,168,76,.14)}
.cimg{width:100%;height:120px;object-fit:cover;display:block}
.cph{width:100%;height:120px;background:linear-gradient(135deg,#1a1a16,#2a2a22);display:flex;align-items:center;justify-content:center;font-size:2.5rem}
.cbody{padding:.8rem}
.ctitle{font-family:'Cormorant Garamond',serif;font-size:.95rem;font-weight:600;color:var(--txt);margin-bottom:.28rem;line-height:1.3}
.cdesc{font-size:.72rem;color:var(--mut);line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:.5rem}
.cmeta{display:flex;gap:.35rem;flex-wrap:wrap}
.tag{font-size:.62rem;padding:2px 7px;border-radius:99px;background:rgba(201,168,76,.08);color:var(--gdim);border:1px solid rgba(201,168,76,.18);letter-spacing:.04em}
.tag.grn{background:rgba(74,124,89,.12);color:#6ab080;border-color:rgba(74,124,89,.28)}
/* MOSAIC */
.mosaic{columns:3;gap:.85rem;margin-bottom:2rem}
.mi{break-inside:avoid;margin-bottom:.85rem;border-radius:11px;overflow:hidden;cursor:pointer;position:relative}
.mimg{width:100%;display:block;transition:transform .35s}
.mi:hover .mimg{transform:scale(1.04)}
.mov{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.88),transparent 55%);display:flex;align-items:flex-end;padding:.85rem;opacity:0;transition:opacity .3s}
.mi:hover .mov{opacity:1}
.mtitle{font-family:'Cormorant Garamond',serif;font-size:1rem;color:#fff}
/* HERO */
.hero{position:relative;overflow:hidden;padding:3.5rem 2rem 2.5rem;margin-bottom:.75rem}
.hbg{position:absolute;inset:0;background:radial-gradient(ellipse at 30% 50%,rgba(201,168,76,.07) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(74,124,89,.05) 0%,transparent 50%)}
.ht{font-family:'Cormorant Garamond',serif;font-size:clamp(2.2rem,4.5vw,3.6rem);font-weight:300;line-height:1.1;color:var(--txt);position:relative}
.ht em{font-style:italic;color:var(--gold)}
.hs{color:var(--mut);font-size:.86rem;margin-top:.65rem;position:relative;letter-spacing:.04em}
/* MODAL */
.backdrop{position:fixed;inset:0;background:rgba(0,0,0,.84);z-index:200;display:flex;align-items:center;justify-content:center;padding:1.5rem;backdrop-filter:blur(8px);animation:fi .2s ease}
.modal{background:var(--card);border:1px solid var(--bor);border-radius:18px;width:100%;max-width:660px;max-height:90vh;overflow-y:auto;animation:su .28s ease}
.mimg2{width:100%;height:260px;object-fit:cover;display:block;border-radius:18px 18px 0 0}
.mph{width:100%;height:180px;background:linear-gradient(135deg,#1a1a16,#2a2a22);display:flex;align-items:center;justify-content:center;font-size:4.5rem;border-radius:18px 18px 0 0}
.mbody{padding:1.75rem}
.mhdr{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.1rem}
.mtit{font-family:'Cormorant Garamond',serif;font-size:1.9rem;font-weight:700;line-height:1.2}
.mclose{background:rgba(255,255,255,.06);border:1px solid var(--bor);color:var(--mut);border-radius:50%;width:34px;height:34px;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s}
.mclose:hover{background:rgba(201,168,76,.1);color:var(--gold);border-color:var(--gdim)}
.mtags{display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:1.1rem}
.div{height:1px;background:var(--bor);margin:1.1rem 0}
.macros{display:flex;gap:.85rem;margin-bottom:1.1rem}
.mac{flex:1;background:rgba(201,168,76,.05);border:1px solid var(--bor);border-radius:9px;padding:.65rem;text-align:center}
.macv{font-family:'Cormorant Garamond',serif;font-size:1.35rem;font-weight:700;color:var(--gold)}
.macl{font-size:.6rem;color:var(--mut);text-transform:uppercase;letter-spacing:.1em;margin-top:2px}
.msub{font-size:.65rem;letter-spacing:.17em;text-transform:uppercase;color:var(--gdim);margin-bottom:.65rem}
.desc{font-size:.87rem;color:var(--mut);line-height:1.7;margin-bottom:.9rem}
.ilist{display:flex;flex-wrap:wrap;gap:.35rem;margin-bottom:.5rem}
.steps{counter-reset:s;list-style:none}
.steps li{counter-increment:s;display:flex;gap:.85rem;padding:.65rem 0;border-bottom:1px solid var(--bor);font-size:.84rem;color:var(--txt);line-height:1.6}
.steps li::before{content:counter(s);min-width:22px;height:22px;background:rgba(201,168,76,.1);border:1px solid var(--gdim);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.68rem;color:var(--gold);font-family:'Cormorant Garamond',serif;flex-shrink:0;margin-top:3px}
/* EMPTY */
.empty{text-align:center;padding:4rem 2rem;color:var(--mut)}
.ei{font-size:2.8rem;margin-bottom:.85rem}
.empty h3{font-family:'Cormorant Garamond',serif;font-size:1.4rem;color:var(--txt);margin-bottom:.4rem}
@keyframes fi{from{opacity:0}to{opacity:1}}
@keyframes su{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes chipIn{from{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}
`;

// ─── RECIPE MODAL ────────────────────────────────────────────
function RecipeModal({ recipe, onClose }) {
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div className="backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {recipe.image
          ? <img src={recipe.image} alt={recipe.title} className="mimg2" />
          : <div className="mph">🍽️</div>}
        <div className="mbody">
          <div className="mhdr">
            <h2 className="mtit">{recipe.title}</h2>
            <button className="mclose" onClick={onClose}>✕</button>
          </div>
          <div className="mtags">
            {recipe.diet.map(d => <span key={d} className="tag grn">{d}</span>)}
            <span className="tag">{recipe.cuisine}</span>
            <span className="tag">⏱ {recipe.time} min</span>
            <span className="tag">{recipe.difficulty}</span>
          </div>
          <div className="macros">
            {[["Calories",recipe.calories,""],["Protein",recipe.protein,"g"],["Carbs",recipe.carbs,"g"],["Fat",recipe.fat,"g"]].map(([l,v,u])=>(
              <div key={l} className="mac"><div className="macv">{v}{u}</div><div className="macl">{l}</div></div>
            ))}
          </div>
          <div className="div"/>
          <div className="msub">About this dish</div>
          <p className="desc">{recipe.description}</p>
          <div className="div"/>
          <div className="msub">Ingredients</div>
          <div className="ilist" style={{marginBottom:"1.1rem"}}>
            {recipe.ingredients.map(id => {
              const ing = INGREDIENTS.find(i => i.id === id);
              return ing ? <span key={id} className="tag">{ing.emoji} {ing.name}</span> : null;
            })}
          </div>
          <div className="msub">Method</div>
          <ol className="steps">{recipe.steps.map((s,i)=><li key={i}>{s}</li>)}</ol>
        </div>
      </div>
    </div>
  );
}

// ─── RECIPE CARD ─────────────────────────────────────────────
function RCard({ recipe, onClick }) {
  return (
    <div className="card" onClick={() => onClick(recipe)}>
      {recipe.image ? <img src={recipe.image} alt={recipe.title} className="cimg" loading="lazy"/> : <div className="cph">🍽️</div>}
      <div className="cbody">
        <div className="ctitle">{recipe.title}</div>
        <div className="cdesc">{recipe.description}</div>
        <div className="cmeta">
          <span className="tag">{recipe.cuisine}</span>
          <span className="tag">⏱ {recipe.time}m</span>
          {recipe.diet.includes("Vegan") && <span className="tag grn">Vegan</span>}
        </div>
      </div>
    </div>
  );
}

// ─── APP ────────────────────────────────────────────────────
export default function MealCraft() {
  const [page, setPage] = useState("home");
  const [modal, setModal] = useState(null);
  const [fridge, setFridge] = useState([]);
  const [over, setOver] = useState(false);
  const [search, setSearch] = useState("");
  const [fCuisine, setFCuisine] = useState("All");
  const [fDiet, setFDiet] = useState("All");
  const [sort, setSort] = useState("popular");
  const [favs, setFavs] = useState([]);
  const [fridgeResults, setFridgeResults] = useState([]);
  const [activeIng, setActiveIng] = useState(null);

  const onDragStart = (e, ing) => e.dataTransfer.setData("ingId", ing.id);
  const onDrop = useCallback((e) => {
    e.preventDefault(); setOver(false);
    const id = e.dataTransfer.getData("ingId");
    if (id && !fridge.find(i => i.id === id)) {
      const ing = INGREDIENTS.find(i => i.id === id);
      if (ing) setFridge(p => [...p, ing]);
    }
  }, [fridge]);

  const cook = () => {
    if (!fridge.length) return;
    const ids = fridge.map(i => i.id);
    setFridgeResults(RECIPES.filter(r => ids.some(id => r.ingredients.includes(id))));
    setPage("fridgeres");
  };

  const filtered = RECIPES.filter(r => {
    const q = search.toLowerCase();
    return (!q || r.title.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q) || r.ingredients.some(id => INGREDIENTS.find(i=>i.id===id)?.name.toLowerCase().includes(q)))
      && (fCuisine === "All" || r.cuisine === fCuisine)
      && (fDiet === "All" || r.diet.includes(fDiet));
  }).sort((a,b) => sort==="quick" ? a.time-b.time : sort==="cal" ? a.calories-b.calories : 0);

  const ingRecipes = activeIng ? RECIPES.filter(r => r.ingredients.includes(activeIng.id)) : [];

  const navTo = (p) => { setPage(p); };

  return (
    <>
      <style>{STYLES}</style>
      <div className="root">
        {/* NAV */}
        <nav className="nav">
          <div style={{cursor:"pointer"}} onClick={()=>navTo("home")}>
            <div className="logo">Meal<em>Craft</em></div>
            <div className="tagline">From Farm to Fork</div>
          </div>
          <div className="nav-links">
            {[["home","Home"],["browse","Browse All"],["fridgeres","My Fridge"],["favs","Favourites"]].map(([id,label])=>(
              <button key={id} className={`nl${page===id?" on":""}`} onClick={()=>navTo(id)}>{label}</button>
            ))}
          </div>
        </nav>

        <div className="body">
          {/* SIDEBAR */}
          <aside className="sidebar">
            {[["Vegetable","🥦 Vegetables"],["Fruit","🍓 Fruits"],["Dry Fruit","🌰 Dry Fruits & Nuts"]].map(([cat,label])=>(
              <div key={cat}>
                <div className="sc">{label}</div>
                {byCategory(cat).map(ing=>(
                  <div key={ing.id} className={`ii${activeIng?.id===ing.id?" sel":""}`}
                    draggable onDragStart={e=>onDragStart(e,ing)}
                    onClick={()=>{ setActiveIng(ing); setPage("ing"); }}>
                    <span className="ie">{ing.emoji}</span>
                    <span>{ing.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </aside>

          {/* MAIN */}
          <main className="main">
            {/* FRIDGE — always visible */}
            <div className={`fridge${over?" over":""}`}
              onDragOver={e=>{e.preventDefault();setOver(true)}}
              onDragLeave={()=>setOver(false)}
              onDrop={onDrop}>
              <div className="fl">🧊 My Fridge — drag ingredients here to find recipes</div>
              <div className="fi">
                {fridge.length===0
                  ? <span className="hint">Drag any vegetable, fruit or dry fruit from the left sidebar into your fridge</span>
                  : fridge.map(ing=>(
                    <div key={ing.id} className="chip">
                      <span>{ing.emoji}</span><span>{ing.name}</span>
                      <button onClick={()=>setFridge(p=>p.filter(i=>i.id!==ing.id))}>×</button>
                    </div>
                  ))
                }
              </div>
              {fridge.length>0 && (
                <div className="fridge-acts">
                  <button className="btn-g" onClick={cook}>🍳 Find Recipes</button>
                  <button className="btn-gh" onClick={()=>setFridge([])}>Clear</button>
                </div>
              )}
            </div>

            {/* HOME */}
            {page==="home" && (
              <>
                <div className="hero">
                  <div className="hbg"/>
                  <h1 className="ht">Cook Something<br/><em>Beautiful.</em></h1>
                  <p className="hs">100% vegetarian · Indian & world cuisines · From farm to fork</p>
                </div>
                <div className="sh"><h2 className="st">Featured Dishes</h2></div>
                <div className="mosaic">
                  {RECIPES.slice(0,9).map((r,i)=>(
                    <div key={r.id} className="mi" onClick={()=>setModal(r)}>
                      {r.image ? <img src={r.image} alt={r.title} className="mimg" style={{aspectRatio:i%3===0?"3/4":"4/3"}}/> : <div style={{background:"#1a1a16",aspectRatio:"4/3",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2.5rem"}}>🍽️</div>}
                      <div className="mov"><div className="mtitle">{r.title}</div></div>
                    </div>
                  ))}
                </div>
                {[
                  {title:"🌏 Indian Classics", items:RECIPES.filter(r=>r.cuisine==="Indian")},
                  {title:"🌍 World Cuisine", items:RECIPES.filter(r=>r.cuisine!=="Indian")},
                  {title:"⚡ Ready in Under 15 mins", items:RECIPES.filter(r=>r.time<=15)},
                  {title:"🌱 Vegan Picks", items:RECIPES.filter(r=>r.diet.includes("Vegan"))},
                ].map(row=>(
                  <div key={row.title} className="nrow">
                    <div className="nrt">{row.title}</div>
                    <div className="nscroll">{row.items.map(r=><RCard key={r.id} recipe={r} onClick={setModal}/>)}</div>
                  </div>
                ))}
              </>
            )}

            {/* BROWSE */}
            {page==="browse" && (
              <>
                <div className="sh" style={{marginTop:".25rem"}}><h2 className="st">All Recipes</h2><span className="sc2">{filtered.length} found</span></div>
                <div className="srow">
                  <div className="sw"><span className="si">⌕</span><input className="search" placeholder="Search recipes, ingredients, cuisines…" value={search} onChange={e=>setSearch(e.target.value)}/></div>
                  <select className="fsel" value={fCuisine} onChange={e=>setFCuisine(e.target.value)}>{cuisines.map(c=><option key={c}>{c}</option>)}</select>
                  <select className="fsel" value={fDiet} onChange={e=>setFDiet(e.target.value)}>{diets.map(d=><option key={d}>{d}</option>)}</select>
                  <select className="fsel" value={sort} onChange={e=>setSort(e.target.value)}>
                    <option value="popular">Popular</option>
                    <option value="quick">Quickest</option>
                    <option value="cal">Lowest Cal</option>
                  </select>
                </div>
                {filtered.length===0
                  ? <div className="empty"><div className="ei">🔍</div><h3>No recipes found</h3><p>Try a different search or filter.</p></div>
                  : <div style={{display:"flex",flexWrap:"wrap",gap:"1rem"}}>{filtered.map(r=><RCard key={r.id} recipe={r} onClick={setModal}/>)}</div>}
              </>
            )}

            {/* INGREDIENT */}
            {page==="ing" && activeIng && (
              <>
                <div className="sh" style={{marginTop:".25rem"}}>
                  <h2 className="st">{activeIng.emoji} {activeIng.name}</h2>
                  <span className="tag grn">{activeIng.category}</span>
                </div>
                <p style={{color:"var(--mut)",fontSize:".84rem",marginBottom:"1.25rem"}}>{ingRecipes.length} recipe{ingRecipes.length!==1?"s":""} using {activeIng.name}</p>
                {ingRecipes.length===0
                  ? <div className="empty"><div className="ei">{activeIng.emoji}</div><h3>Coming soon</h3><p>Recipes for {activeIng.name} will be added shortly.</p></div>
                  : <div style={{display:"flex",flexWrap:"wrap",gap:"1rem"}}>{ingRecipes.map(r=><RCard key={r.id} recipe={r} onClick={setModal}/>)}</div>}
              </>
            )}

            {/* FRIDGE RESULTS */}
            {page==="fridgeres" && (
              <>
                <div className="sh" style={{marginTop:".25rem"}}><h2 className="st">🧊 From Your Fridge</h2><span className="sc2">{fridgeResults.length} recipes</span></div>
                <div style={{display:"flex",gap:".4rem",flexWrap:"wrap",marginBottom:"1.25rem"}}>
                  {fridge.map(i=><span key={i.id} className="chip" style={{animation:"none"}}>{i.emoji} {i.name}</span>)}
                </div>
                {fridgeResults.length===0
                  ? <div className="empty"><div className="ei">😕</div><h3>No matches</h3><p>Try adding more ingredients to your fridge.</p></div>
                  : <div style={{display:"flex",flexWrap:"wrap",gap:"1rem"}}>{fridgeResults.map(r=><RCard key={r.id} recipe={r} onClick={setModal}/>)}</div>}
              </>
            )}

            {/* FAVOURITES */}
            {page==="favs" && (
              <>
                <div className="sh" style={{marginTop:".25rem"}}><h2 className="st">❤️ Saved Recipes</h2><span className="sc2">{favs.length} saved</span></div>
                {favs.length===0
                  ? <div className="empty"><div className="ei">🤍</div><h3>Nothing saved yet</h3><p>Open any recipe and save it to your favourites.</p></div>
                  : <div style={{display:"flex",flexWrap:"wrap",gap:"1rem"}}>{RECIPES.filter(r=>favs.includes(r.id)).map(r=><RCard key={r.id} recipe={r} onClick={setModal}/>)}</div>}
              </>
            )}
          </main>
        </div>

        {modal && <RecipeModal recipe={modal} onClose={()=>setModal(null)}/>}
      </div>
    </>
  );
}