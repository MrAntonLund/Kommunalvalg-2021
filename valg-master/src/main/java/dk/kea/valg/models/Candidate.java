package dk.kea.valg.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Table(name = "candidates")
@Entity
@NoArgsConstructor
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private Integer votes;

    @ManyToOne
    @JoinColumn (name = "party_id", nullable = false)
    private Party affiliation;
}
