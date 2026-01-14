#!/bin/bash

echo "Validating UI Redesign..."
echo "=========================="

# Check HTML file
echo "Checking HTML file..."
if [ -f "Frontend/road_to_glory_fe/src/app/modules/game_object/components/game/game.component.html" ]; then
    echo "✓ HTML file exists"
    if grep -q "game-container" Frontend/road_to_glory_fe/src/app/modules/game_object/components/game/game.component.html; then
        echo "✓ game-container class found"
    fi
    if grep -q "resource-bar" Frontend/road_to_glory_fe/src/app/modules/game_object/components/game/game.component.html; then
        echo "✓ resource-bar found"
    fi
    if grep -q "game-board" Frontend/road_to_glory_fe/src/app/modules/game_object/components/game/game.component.html; then
        echo "✓ game-board found"
    fi
    if grep -q "getTerrainClass" Frontend/road_to_glory_fe/src/app/modules/game_object/components/game/game.component.html; then
        echo "✓ getTerrainClass binding found"
    fi
else
    echo "✗ HTML file not found"
fi

# Check CSS file
echo ""
echo "Checking CSS file..."
if [ -f "Frontend/road_to_glory_fe/src/app/modules/game_object/components/game/game.component.css" ]; then
    echo "✓ CSS file exists"
    if grep -q "game-container" Frontend/road_to_glory_fe/src/app/modules/game_object/components/game/game.component.css; then
        echo "✓ game-container styles found"
    fi
    if grep -q "resource-bar" Frontend/road_to_glory_fe/src/app/modules/game_object/components/game/game.component.css; then
        echo "✓ resource-bar styles found"
    fi
    if grep -q "game-board" Frontend/road_to_glory_fe/src/app/modules/game_object/components/game/game.component.css; then
        echo "✓ game-board styles found"
    fi
    if grep -q "board-cell" Frontend/road_to_glory_fe/src/app/modules/game_object/components/game/game.component.css; then
        echo "✓ board-cell styles found"
    fi
else
    echo "✗ CSS file not found"
fi

# Check TypeScript file
echo ""
echo "Checking TypeScript file..."
if [ -f "Frontend/road_to_glory_fe/src/app/modules/game_object/components/game/game.component.ts" ]; then
    echo "✓ TypeScript file exists"
    if grep -q "getTerrainClass" Frontend/road_to_glory_fe/src/app/modules/game_object/components/game/game.component.ts; then
        echo "✓ getTerrainClass method found"
    fi
    if grep -q "public player" Frontend/road_to_glory_fe/src/app/modules/game_object/components/game/game.component.ts; then
        echo "✓ player property is public"
    fi
    if grep -q "public room" Frontend/road_to_glory_fe/src/app/modules/game_object/components/game/game.component.ts; then
        echo "✓ room property is public"
    fi
else
    echo "✗ TypeScript file not found"
fi

# Check global styles
echo ""
echo "Checking global styles..."
if [ -f "Frontend/road_to_glory_fe/src/styles.scss" ]; then
    echo "✓ Global styles.scss created"
else
    echo "✗ Global styles.scss not found"
fi

# Check angular.json
echo ""
echo "Checking angular.json..."
if grep -q "styles.scss" Frontend/road_to_glory_fe/angular.json; then
    echo "✓ angular.json references styles.scss"
else
    echo "✗ angular.json does not reference styles.scss"
fi

echo ""
echo "=========================="
echo "Validation Complete!"
