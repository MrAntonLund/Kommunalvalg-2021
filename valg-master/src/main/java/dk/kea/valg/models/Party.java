package dk.kea.valg.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Data
@Table (name = "parties")
@Entity
public class Party {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private Character letter;

    @Column
    private String colour; // in HEX-value

    @Column
    private Integer votes;

    @JsonIgnore
    @OneToMany(mappedBy = "affiliation", fetch = FetchType.LAZY)
    private Set<Candidate> candidates;

}
