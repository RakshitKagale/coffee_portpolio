package com.example.demo.controller;

import com.example.demo.model.ContactInquiry;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @PostMapping
    public ResponseEntity<Map<String, Object>> submitInquiry(@RequestBody ContactInquiry inquiry) {
        System.out.println("Received Contact Inquiry from: " + inquiry.getName());
        System.out.println("Email: " + inquiry.getEmail());
        System.out.println("Message: " + inquiry.getMessage());

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Inquiry received successfully! We will get back to you soon.");
        response.put("receivedData", inquiry);

        return ResponseEntity.ok(response);
    }
}
