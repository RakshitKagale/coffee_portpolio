package com.example.demo.controller;

import com.example.demo.model.MenuItem;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "*")
public class MenuController {

    @GetMapping
    public Map<String, List<MenuItem>> getMenu() {
        Map<String, List<MenuItem>> menu = new HashMap<>();

        menu.put("Hot Coffee", Arrays.asList(
            new MenuItem("Espresso", "Double ristretto shot", "$4.50"),
            new MenuItem("Americano", "Espresso with hot water", "$4.00"),
            new MenuItem("Flat White", "Ristretto with micro-foam milk", "$5.50"),
            new MenuItem("Cappuccino", "Equal parts espresso, milk, foam", "$5.50"),
            new MenuItem("Latte", "Espresso with steamed milk", "$5.00"),
            new MenuItem("Mocha", "Espresso with chocolate sauce", "$6.00"),
            new MenuItem("Macchiato", "Espresso \"stained\" with foam", "$5.00"),
            new MenuItem("Cortado", "Equal parts espresso and warm milk", "$5.00")
        ));

        menu.put("Cold Coffee", Arrays.asList(
            new MenuItem("Cold Brew", "20-hour slow brewed concentrate", "$5.50"),
            new MenuItem("Iced Latte", "Espresso over ice with cold milk", "$5.50"),
            new MenuItem("Nitro Cold Brew", "Nitrogen-infused cold brew", "$6.50"),
            new MenuItem("Iced Mocha", "Cold espresso with chocolate", "$6.50"),
            new MenuItem("Frappuccino", "Blended ice coffee delight", "$7.00"),
            new MenuItem("Iced Cappuccino", "Cold espresso and foam over ice", "$6.00")
        ));

        menu.put("Desserts", Arrays.asList(
            new MenuItem("Tiramisu", "Classic Italian coffee dessert", "$8.00"),
            new MenuItem("Chocolate Mousse", "Airy dark chocolate delight", "$7.50"),
            new MenuItem("Crème Brûlée", "Vanilla custard, caramelized top", "$9.00"),
            new MenuItem("Opera Cake", "French coffee & almond layered cake", "$8.50"),
            new MenuItem("Panna Cotta", "Silky Italian cream pudding", "$7.00"),
            new MenuItem("Coffee Macarons", "Delicate French almond cookies", "$5.00")
        ));

        menu.put("Snacks", Arrays.asList(
            new MenuItem("Almond Croissant", "Buttery, flaky, filled with almond cream", "$4.50"),
            new MenuItem("Avocado Toast", "Sourdough with smashed avocado", "$7.00"),
            new MenuItem("Cheese Board", "Artisan cheeses with nuts and honey", "$14.00"),
            new MenuItem("Bruschetta", "Grilled bread with tomato and basil", "$6.00"),
            new MenuItem("Granola Parfait", "Greek yogurt with seasonal berries", "$7.50"),
            new MenuItem("Dark Chocolate Bar", "70% single-origin cacao", "$4.00")
        ));

        return menu;
    }
}
