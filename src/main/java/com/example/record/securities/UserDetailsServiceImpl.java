package com.example.record.securities;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.example.record.models.dao.UserAccountRepository;
import com.example.record.models.entities.UserAccount;


@Component
public class UserDetailsServiceImpl implements UserDetailsService{

    @Autowired
    UserAccountRepository userAccountRepository;
    

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        // db接続の検証
        try {
            userAccountRepository.count();
        } catch (Exception e){
            System.out.println("DBに接続できません");
            throw new UsernameNotFoundException(email);
        }

        UserAccount user = userAccountRepository.findByEmailAndDeleteAtIsNull(email)
                    .orElseThrow(() -> {
                        System.out.println("ユーザー:" + email + "が見つかりません。");
                        throw new UsernameNotFoundException(email);
                    });

        return User.withUsername(
            user.getEmail())
            .password(user.getPassword())
            .roles(mapRole(user.getPermissionLevel()))
            .build();
    }

    /**
     * ユーザーの権限レベルをロールにマッピングするメソッド
     * @param role 
     * @return String 
     */
    private String mapRole(int role){
        if (role == 1){
            return "ADMIN";
        } else if (role == 2) {
            return "USER";
        } else {
            return "OTHER";
        }
    }
}
