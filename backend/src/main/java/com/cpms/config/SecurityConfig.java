package com.cpms.config;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint((request, response, authException) -> {
                    response.setContentType("application/json;charset=UTF-8");
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("{\"status\":401,\"error\":\"Unauthorized\",\"message\":\"Authentication token is missing, invalid, or expired. Please log in.\"}");
                })
                .accessDeniedHandler((request, response, accessDeniedException) -> {
                    response.setContentType("application/json;charset=UTF-8");
                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    response.getWriter().write("{\"status\":403,\"error\":\"Forbidden\",\"message\":\"Access denied: Your institutional role does not have clearance for this resource.\"}");
                })
            )
            .authorizeHttpRequests(auth -> auth
                // Allow CORS preflight OPTIONS requests
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // Public Authentication and Health Endpoints
                .requestMatchers("/api/auth/login", "/api/auth/register", "/api/auth/change-password",
                                 "/api/auth/send-otp", "/api/auth/verify-otp", "/api/auth/reset-password-otp").permitAll()
                .requestMatchers("/api/health", "/api/notifications/test-email", "/error").permitAll()

                // Admin Exclusive Endpoints
                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                // Officer and Admin Operations
                .requestMatchers(HttpMethod.POST, "/api/drives/**").hasAnyRole("OFFICER", "ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/students/*/verify").hasAnyRole("OFFICER", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/interviews/**").hasAnyRole("OFFICER", "ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/interviews/**").hasAnyRole("OFFICER", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/placement-records/**").hasAnyRole("OFFICER", "ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/placement-records/**").hasAnyRole("OFFICER", "ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/placement-records/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/applications/*/status", "/api/applications/*/stage").hasAnyRole("OFFICER", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/applications/bulk-shortlist").hasAnyRole("OFFICER", "ADMIN")

                // All other API requests require valid authenticated session
                .requestMatchers("/api/**").authenticated()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of("*"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
